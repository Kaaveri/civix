import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import styles from "./createPetition.module.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreatePetition = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    target: "",
    description: "",
  });

  const categories = [
    "Infrastructure",
    "Environment",
    "Education",
    "Healthcare",
    "Transport",
    "Public Safety",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value) => {
    setForm({ ...form, category: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const petitionData = {
      title: form.title,
      category: form.category,
      location: form.location,
      target: Number(form.target),
      description: form.description,
      createdDate: new Date().toISOString(),
      updatedDate: null,
    };

    try {
      const response = await fetch("http://localhost:3000/api/petitions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petitionData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Petition created successfully!");
        navigate("/petitions");
      } else {
        alert(data.message || "Failed to create petition");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please check backend.");
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1 className={styles.title}>Create New Petition</h1>

        <p className={styles.subtitle}>
          Fill the details below to start a new petition.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          
          {/* Title */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Title</label>

            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter petition title"
              className={styles.input}
              required
            />
          </div>

          {/* Category */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Category</label>

            <Select
              value={form.category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className={styles.selectTrigger}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent className={styles.selectContent}>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Location</label>

            <Input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter location"
              className={styles.input}
              required
            />
          </div>

          {/* Target */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Target Signatures</label>

            <Input
              name="target"
              type="number"
              value={form.target}
              onChange={handleChange}
              placeholder="5000"
              className={styles.input}
              required
            />
          </div>

          {/* Description */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>

            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your petition..."
              className={styles.textarea}
              required
            />
          </div>

          {/* Buttons */}
          <div className={styles.buttonGroup}>
            <Button
              type="button"
              className={styles.buttonOutline}
              onClick={() => navigate("/petitions")}
            >
              Cancel
            </Button>

            <Button type="submit" className={styles.buttonPrimary}>
              Create Petition
            </Button>
          </div>

        </form>
      </Card>
    </div>
  );
};

export default CreatePetition;