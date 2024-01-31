import React from "react";
import "./custom-styles.css"; // This is your custom CSS file

const FairytaleText = () => {
  return (
    <div className="bg-parchment text-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
      <p className="text-lg leading-relaxed font-serif">
        <span className="initial">T</span>here once was a kingdom where magic
        and wonder were as common as the stones and rivers. The people lived in
        harmony with the land, and legends were as alive as the whispering
        trees...
      </p>
      {/* Additional paragraphs as needed */}
    </div>
  );
};

export default FairytaleText;
