import axios from 'axios';

const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY;

interface PlaceDetails {
  imageUrl?: string;
  mapLink?: string;
  rating?: number;
  reviews?: number;
  address?: string;
}

export async function fetchPlaceDetails(query: string): Promise<PlaceDetails> {
  if (!SERPAPI_API_KEY) {
    console.warn("SERPAPI_API_KEY is missing");
    return {};
  }

  try {
    // Use SerpAPI google_images engine for hotel images
    const imageResponse = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_images',
        q: query,
        ijn: '0', // first page
        api_key: SERPAPI_API_KEY,
      },
    });

    const imageResults = imageResponse.data.images_results || [];
    const imageUrl = imageResults.length > 0 
      ? (imageResults[0].original || imageResults[0].thumbnail)
      : undefined;

    // Create Google Maps link (FREE - no API needed)
    const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

    const result: PlaceDetails = {
      imageUrl,
      mapLink,
    };

    return result;

  } catch (error: any) {
    console.error(`Failed to fetch details for ${query}:`, error.response?.data || error.message);
    return {};
  }
}

