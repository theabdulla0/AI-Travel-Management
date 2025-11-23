import arcjet, {
  detectBot,
  tokenBucket,
  shield,
  validateEmail,
  slidingWindow,
} from "@arcjet/next";

// Main Arcjet instance with comprehensive security rules
export const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    // Bot detection for all routes
    detectBot({
      mode: "LIVE",
      allow: [
        // Allow common search engine crawlers
        "CATEGORY:SEARCH_ENGINE",
      ],
    }),
    // Shield against common attacks (SQL injection, XSS, etc.)
    shield({
      mode: "LIVE",
    }),
  ],
});

// Rate limiting for AI trip generation (strict limits)
export const ajAIGeneration = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    shield({ mode: "LIVE" }),
    // Token bucket for AI generation - 10 requests per day per user
    tokenBucket({
      mode: "LIVE",
      characteristics: ["userId"],
      refillRate: 10,
      interval: "1d",
      capacity: 10,
    }),
  ],
});

// Rate limiting for general API routes
export const ajAPI = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    shield({ mode: "LIVE" }),
    // Sliding window for API routes - 100 requests per 15 minutes per IP
    slidingWindow({
      mode: "LIVE",
      interval: "15m",
      max: 100,
    }),
  ],
});

// Rate limiting for public routes (more lenient)
export const ajPublic = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    // Public routes get higher limits - 1000 requests per hour per IP
    slidingWindow({
      mode: "LIVE",
      interval: "1h",
      max: 1000,
    }),
  ],
});

// Email validation utility
export const ajEmail = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    validateEmail({
      mode: "LIVE",
      block: ["DISPOSABLE", "NO_MX_RECORDS"],
    }),
  ],
});

// Helper function to check if a request is denied
export function isArcjetDenied(decision: any): boolean {
  return decision.isDenied();
}

// Helper function to get denial reason
export function getArcjetDenialReason(decision: any): string {
  if (decision.reason.isRateLimit()) {
    return "Rate limit exceeded. Please try again later.";
  }
  if (decision.reason.isBot()) {
    return "Bot detected. Please verify you are human.";
  }
  if (decision.reason.isShield()) {
    return "Request blocked for security reasons.";
  }
  return "Request denied.";
}
