export const demoTripPlan = {
  tripTitle: "Magical Paris Adventure",
  destination: {
    city: "Paris",
    country: "France"
  },
  durationDays: 3,
  budgetCategory: "Moderate",
  itinerary: [
    {
      day: 1,
      title: "Exploring Iconic Landmarks",
      activities: [
        {
          name: "Eiffel Tower Visit",
          time: "9:00 AM",
          duration: "2 hours",
          location: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris",
          category: "Sightseeing",
          description:
            "Start your day with a visit to the iconic Eiffel Tower. Take the elevator to the summit for breathtaking panoramic views of Paris.",
          imageUrl:
            "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80",
          mapLink: "https://maps.google.com/?q=Eiffel+Tower+Paris"
        },
        {
          name: "Seine River Cruise",
          time: "12:00 PM",
          duration: "1.5 hours",
          location: "Port de la Bourdonnais, 75007 Paris",
          category: "Activity",
          description:
            "Enjoy a relaxing cruise along the Seine River, passing by Notre-Dame, the Louvre, and other landmarks.",
          imageUrl:
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
          mapLink: "https://maps.google.com/?q=Port+de+la+Bourdonnais+Paris"
        },
        {
          name: "Louvre Museum",
          time: "3:00 PM",
          duration: "3 hours",
          location: "Rue de Rivoli, 75001 Paris",
          category: "Culture",
          description:
            "Explore the world’s largest art museum. See the Mona Lisa, Venus de Milo, and thousands of masterpieces.",
          imageUrl:
            "https://images.unsplash.com/photo-1502602898657-e97b2deba1b1?w=800&q=80",
          mapLink: "https://maps.google.com/?q=Louvre+Museum+Paris"
        },
        {
          name: "Dinner at Le Comptoir du Relais",
          time: "8:00 PM",
          duration: "2 hours",
          location: "9 Carrefour de l'Odéon, 75006 Paris",
          category: "Dining",
          description:
            "Experience authentic French bistro cuisine in the charming Saint-Germain-des-Prés neighborhood.",
          imageUrl:
            "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",
          mapLink:
            "https://maps.google.com/?q=Le+Comptoir+du+Relais+Paris"
        }
      ],
      hotel: {
        name: "Hotel Le Marais",
        address: "18 Rue du Pont Louis-Philippe, 75004 Paris",
        rating: 4.5,
        reviews: "1,234",
        imageUrl:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        mapLink: "https://maps.google.com/?q=Hotel+Le+Marais+Paris"
      }
    },

    {
      day: 2,
      title: "Art & Culture Immersion",
      activities: [
        {
          name: "Montmartre Walking Tour",
          time: "9:30 AM",
          duration: "3 hours",
          location: "Place du Tertre, 75018 Paris",
          category: "Walking Tour",
          description:
            "Discover the artistic soul of Montmartre. Visit Sacré-Cœur, explore charming cobblestone streets, and watch street artists.",
          imageUrl:
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb36?w=800&q=80",
          mapLink: "https://maps.google.com/?q=Place+du+Tertre+Paris"
        },
        {
          name: "Lunch at Café des Deux Moulins",
          time: "1:00 PM",
          duration: "1 hour",
          location: "15 Rue Lepic, 75018 Paris",
          category: "Dining",
          description:
            "Have lunch at the famous café from the Amélie movie. Try the crème brûlée!",
          imageUrl:
            "https://images.unsplash.com/photo-1541888946425-d81bb19240f9?w=800&q=80",
          mapLink:
            "https://maps.google.com/?q=Cafe+des+Deux+Moulins+Paris"
        },
        {
          name: "Musée d'Orsay",
          time: "3:00 PM",
          duration: "2.5 hours",
          location: "1 Rue de la Légion d'Honneur, 75007 Paris",
          category: "Museum",
          description:
            "See masterpieces by Monet, Renoir, Van Gogh, and more in a stunning Beaux-Arts railway station.",
          imageUrl:
            "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&q=80",
          mapLink: "https://maps.google.com/?q=Musee+d'Orsay+Paris"
        },
        {
          name: "Evening at Moulin Rouge",
          time: "9:00 PM",
          duration: "2 hours",
          location: "82 Boulevard de Clichy, 75018 Paris",
          category: "Entertainment",
          description:
            "Experience the legendary cabaret show with amazing dancers, costumes, and champagne.",
          imageUrl:
            "https://images.unsplash.com/photo-1473956132202-b859caa91f47?w=800&q=80",
          mapLink: "https://maps.google.com/?q=Moulin+Rouge+Paris"
        }
      ],
      hotel: {
        name: "Hotel Le Marais",
        address: "18 Rue du Pont Louis-Philippe, 75004 Paris",
        rating: 4.5,
        reviews: "1,234",
        imageUrl:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        mapLink: "https://maps.google.com/?q=Hotel+Le+Marais+Paris"
      }
    },

    {
      day: 3,
      title: "Versailles & Farewell",
      activities: [
        {
          name: "Palace of Versailles",
          time: "9:00 AM",
          duration: "4 hours",
          location: "Place d'Armes, 78000 Versailles",
          category: "Historical Site",
          description:
            "Walk through the Hall of Mirrors, royal apartments, and grand gardens of this UNESCO World Heritage site.",
          imageUrl:
            "https://images.unsplash.com/photo-1526932847229-89ff2c6cf80b?w=800&q=80",
          mapLink:
            "https://maps.google.com/?q=Palace+of+Versailles"
        },
        {
          name: "Gardens of Versailles",
          time: "1:30 PM",
          duration: "2 hours",
          location: "Gardens of Versailles, 78000 Versailles",
          category: "Nature",
          description:
            "Explore the breathtaking French gardens, fountains, and scenic walking paths.",
          imageUrl:
            "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&q=80",
          mapLink:
            "https://maps.google.com/?q=Gardens+of+Versailles"
        },
        {
          name: "Return to Paris - Champs-Élysées",
          time: "4:00 PM",
          duration: "2 hours",
          location: "Avenue des Champs-Élysées, 75008 Paris",
          category: "Shopping",
          description:
            "Shop, explore, and enjoy the world-famous boulevard ending at the Arc de Triomphe.",
          imageUrl:
            "https://images.unsplash.com/photo-1473957052495-58fd43fc51b3?w=800&q=80",
          mapLink:
            "https://maps.google.com/?q=Champs+Élysées+Paris"
        },
        {
          name: "Farewell Dinner at Le Jules Verne",
          time: "8:00 PM",
          duration: "2 hours",
          location:
            "Eiffel Tower, Avenue Gustave Eiffel, 75007 Paris",
          category: "Fine Dining",
          description:
            "Dine inside the Eiffel Tower with a stunning Michelin-starred French menu.",
          imageUrl:
            "https://images.unsplash.com/photo-1526318472351-bc6d21478994?w=800&q=80",
          mapLink:
            "https://maps.google.com/?q=Le+Jules+Verne+Eiffel+Tower"
        }
      ],
      hotel: {
        name: "Hotel Le Marais",
        address: "18 Rue du Pont Louis-Philippe, 75004 Paris",
        rating: 4.5,
        reviews: "1,234",
        imageUrl:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        mapLink: "https://maps.google.com/?q=Hotel+Le+Marais+Paris"
      }
    }
  ]
};

export const demoTripData = {
  destination: "Paris, France",
  travelers: "2 Adults",
  startDate: "Dec 15, 2025",
  endDate: "Dec 18, 2025",
  budget: "Moderate",
  purpose: ["Sightseeing", "Culture", "Food & Dining", "Photography"]
};
