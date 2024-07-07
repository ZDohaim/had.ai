import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GiftGenerator.css";
import axios from "axios";

function GiftGenerator() {
  const navigate = useNavigate();

  const [gender, setGender] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [relationship, setRelationship] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [giftType, setGiftType] = useState("");
  const [occasion, setOccasion] = useState("");
  const [interests, setInterests] = useState("");
  const [giftIdeas, setGiftIdeas] = useState("");

  const genderOptions = ["Male", "Female", "Other"];
  const ageRangeOptions = ["0-12", "13-18", "19-30", "31-50", "51+"];
  const relationshipOptions = [
    "Family",
    "Friend",
    "Partner",
    "Colleague",
    "Other",
  ];
  const priceRangeOptions = [
    "<$25",
    "$25-$50",
    "$51-$100",
    "$101-$200",
    ">$200",
  ];
  const giftTypeOptions = ["Electronics", "Books", "Clothing", "Toys", "Other"];
  const occasionOptions = [
    "Birthday",
    "Anniversary",
    "Christmas",
    "Valentine's Day",
    "Other",
  ];
  const interestsOptions = [
    "Sports",
    "Music",
    "Art",
    "Technology",
    "Travel",
    "Other",
  ];

  const handleSubmit = async () => {
    const data = {
      gender,
      ageRange,
      relationship,
      priceRange,
      giftType,
      occasion,
      interests,
    };

    try {
      const response = await axios.post("/api/gift-ideas", data);
      console.log("Gift ideas received from API:", response.data.giftIdeas); // Log the API response
      setGiftIdeas(response.data.giftIdeas);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
      console.log(error.response ? error.response.data : error.message); // Log detailed error information
    }
  };

  return (
    <div className="GiftGenerator">
      <h1>Gift Ideas AI</h1>
      <div className="dropdown-group">
        <label>
          Gender:
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="" disabled>
              Select...
            </option>
            {genderOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Age Range:
          <select
            value={ageRange}
            onChange={(e) => setAgeRange(e.target.value)}
          >
            <option value="" disabled>
              Select...
            </option>
            {ageRangeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Relationship:
          <select
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
          >
            <option value="" disabled>
              Select...
            </option>
            {relationshipOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="dropdown-group">
        <label>
          Price Range:
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="" disabled>
              Select...
            </option>
            {priceRangeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Gift Type:
          <select
            value={giftType}
            onChange={(e) => setGiftType(e.target.value)}
          >
            <option value="" disabled>
              Select...
            </option>
            {giftTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Occasion:
          <select
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
          >
            <option value="" disabled>
              Select...
            </option>
            {occasionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="dropdown-group">
        <label>
          Interests:
          <select
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
          >
            <option value="" disabled>
              Select...
            </option>
            {interestsOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button onClick={handleSubmit}>Search with AI</button>
      <div>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
      {giftIdeas && (
        <div className="results">
          <h2>Gift Ideas:</h2>
          <p>{giftIdeas}</p>
        </div>
      )}
    </div>
  );
}

export default GiftGenerator;
