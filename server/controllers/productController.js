const Product = require("../models/Product");
const Review = require("../models/Review");

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const createProduct = async (req, res) => {
  try {
    const product = new Product({ ...req.body, seller: req.user.id });
    await product.save();
    return res.json(product);
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json("Product not found");
    }
    //  TODO fetch the reviews later
    const reviews = await Review.find({ productId: productId }).populate(
      "user",
      "name email"
    );

    return res.status(200).json({
      ...product._doc,
      reviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      { ...req.body },
      {
        new: true,
      }
    );
    if (!product) {
      return res.status(404).json("Product not found");
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json("No product found");
    }
    // TODO delete the review when product is deleted
    await Review.deleteMany({ productId: productId });
    return res.status(200).json("Product deleted!");
  } catch (error) {
    console.log(error);
  }
};

const relatedProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json("productId is required");
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json("No product found");
    }

    const titleRegex = new RegExp(product.title.split(" ").join("|"), "i");
    const categoryRegex = new RegExp(
      product.category.split(" ").join("|"),
      "i"
    );

    const relatedQuery = {
      _id: { $ne: id },
      category: { $regex: categoryRegex },
      title: { $regex: titleRegex },
    };
    const relatedProduct = await Product.find(relatedQuery);
    return res.status(200).json(relatedProduct);
  } catch (error) {
    console.log(error);
  }
};

const totalProducts = async (req, res) => {
  try {
    const totalProduct = await Product.countDocuments({});
    return res.status(200).json(totalProduct);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  relatedProduct,
  totalProducts,
};
