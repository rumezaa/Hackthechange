import React from "react";

const ResourceRecommendation = ({ userKeywords }) => {
  const data = {
    drugAddiction: "drug addiction",
    alcoholAbuse: "alcohol abuse",
    domesticAbuse: "domestic abuse",
    mentalHealth: "mental health",
    economicInstability: "economic instability",
    anger: "anger",
  };

  // Resources mapping based on keywords
  const resources = {
    drugAddiction: [
      "https://distresscentre.com/",
      "https://www.yourcounselling.ca/calgary-resources-for-crisis-and-mental-health/",
    ],
    alcoholAbuse: [
      "https://www.yourcounselling.ca/calgary-resources-for-crisis-and-mental-health/",
    ],
    domesticAbuse: [
      "https://www.centreforsexuality.ca/programs-services/counselling/",
      "https://distresscentre.com/",
    ],
    mentalHealth: [
      "https://www.yourcounselling.ca/calgary-resources-for-crisis-and-mental-health/",
      "https://www.ucalgary.ca/hr/wellness/wellbeing-worklife/mental-health/resources",
      "https://www.emotionstherapycalgary.ca/blog-therapy-calgary-emotions-clinic/mental-health-resources-calgary",
    ],
    economicInstability: [
      "https://www.yourcounselling.ca/calgary-resources-for-crisis-and-mental-health/",
    ],
    anger: [
      "https://www.yourcounselling.ca/calgary-resources-for-crisis-and-mental-health/",
    ],
  };

  // Function to check which resources to show based on keywords
  const getRecommendedResources = () => {
    const recommended = [];

    // Iterate through the user's keywords and match with the available resources
    userKeywords &&
      Object.keys(data).forEach((key) => {
        if (userKeywords[key]) {
          recommended.push(...resources[key]);
        }
      });

    return [...new Set(recommended)]; // Remove duplicates if any
  };

  const recommendedResources = getRecommendedResources();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recommended Resources</h2>
      {recommendedResources?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedResources?.map((url, index) => (
             <a href={url} target="_blank" key={index}>
            <div
              className="border p-2 rounded-lg shadow-md bg-white"
            >
             
                <iframe
                  src={url}
                  title={`Resource ${index + 1}`}
                  width="100%"
                  height="300px"
                  frameBorder="0"
                  className="rounded-lg"
                />
           
            </div>
            </a>
          ))}
        </div>
      ) : (
        <p>No resources found for the selected keywords.</p>
      )}
    </div>
  );
};

export default ResourceRecommendation;
