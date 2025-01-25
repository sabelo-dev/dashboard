import mongoose from "mongoose";

const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const CategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
        },
        message: (props: { value: any; }) => `${props.value} is not a valid URL!`,
      },
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    submenu: {
      type: String,
    },
    subcategories: [SubcategorySchema],
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model("Category", CategoriesSchema);
export default Category;
