import React from 'react';

const HouseStructure = ({ 
  area, 
  bedrooms, 
  bathrooms, 
  stories, 
  houseColor = "white", 
  bedroomColor = "lightblue", 
  bathroomColor = "lightcoral" 
}) => {
  // Constants for the house dimensions
  const scale = 50; // Scale factor for 50 times smaller size
  const houseWidth = Math.sqrt(area) * scale; // Width based on area
  const houseHeight = stories * 20 * scale; // Height based on stories (20 feet per story)

  // Calculate room dimensions
  const roomWidth = houseWidth / (bedrooms + bathrooms); // Width per bedroom/bathroom
  const roomHeight = houseHeight / stories; // Height per story

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${houseWidth + 60} ${houseHeight + 60}`} // Viewbox for responsiveness
      style={{ backgroundColor: 'black', border: '1px solid white' }}
      aria-label="House structure representation"
    >
      {/* Draw the house base */}
      <rect
        x={30}
        y={30}
        width={houseWidth}
        height={houseHeight}
        fill="none"
        stroke={houseColor}
        strokeWidth="3" // Stroke width for house base
      />

      {/* Draw bedrooms */}
      {Array.from({ length: bedrooms }).map((_, index) => (
        <g key={`bedroom-${index}`}>
          <rect
            x={30 + index * roomWidth}
            y={30}
            width={roomWidth}
            height={roomHeight}
            fill="none"
            stroke={bedroomColor} // Color for bedrooms
            strokeWidth="2"
          />
          {/* Bedroom label */}
          <text 
            x={30 + index * roomWidth + roomWidth / 2} 
            y={50} 
            fill={bedroomColor} 
            fontSize="14" 
            textAnchor="middle"
          >
            Bedroom {index + 1}
          </text>
        </g>
      ))}

      {/* Draw bathrooms */}
      {Array.from({ length: bathrooms }).map((_, index) => (
        <g key={`bathroom-${index}`}>
          <rect
            x={30 + (bedrooms + index) * roomWidth}
            y={30}
            width={roomWidth}
            height={roomHeight}
            fill="none"
            stroke={bathroomColor} // Color for bathrooms
            strokeWidth="2"
          />
          {/* Bathroom label */}
          <text 
            x={30 + (bedrooms + index) * roomWidth + roomWidth / 2} 
            y={50} 
            fill={bathroomColor} 
            fontSize="14" 
            textAnchor="middle"
          >
            Bathroom {index + 1}
          </text>
        </g>
      ))}

      {/* Draw horizontal lines for stories */}
      {Array.from({ length: stories }).map((_, index) => (
        <line
          key={`story-line-${index}`}
          x1={30}
          y1={30 + (index + 1) * roomHeight}
          x2={30 + houseWidth}
          y2={30 + (index + 1) * roomHeight}
          stroke="white"
          strokeWidth="1"
        />
      ))}

      {/* Add labels for dimensions */}
      <text x="35" y="45" fill="white" fontSize="16">
        Area: {area} sqft
      </text>
      <text x="35" y="65" fill={bedroomColor} fontSize="16">
        Bedrooms: {bedrooms}
      </text>
      <text x="35" y="85" fill={bathroomColor} fontSize="16">
        Bathrooms: {bathrooms}
      </text>
      <text x="35" y="105" fill="white" fontSize="16">
        Stories: {stories}
      </text>
    </svg>
  );
};

export default HouseStructure;
