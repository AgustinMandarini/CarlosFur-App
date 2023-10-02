const validatePostProduct = (req, res, next) => {
  const { name, price, height, depth, width, weight, description, imagePath } =
    req.body;
  if (!name) return res.status(400).json({ error: "Missing name" });
  if (!price) return res.status(400).json({ error: "Missing price" });
  if (price < 0)
    return res.status(400).json({ error: "Price must be greater than 0" });
  if (typeof price !== "number")
    return res.status(400).json({ error: "Price must be a number" });
  if (height < 0)
    return res.status(400).json({ error: "Height must be greater than 0" });
  if (typeof height !== "number")
    return res.status(400).json({ error: "Height must be a number" });
  if (depth < 0)
    return res.status(400).json({ error: "Depth must be greater than 0" });
  if (typeof depth !== "number")
    return res.status(400).json({ error: "Depth must be a number" });
  if (width < 0)
    return res.status(400).json({ error: "Width must be greater than 0" });
  if (typeof width !== "number")
    return res.status(400).json({ error: "Width must be a number" });
  if (weight < 0)
    return res.status(400).json({ error: "Weight must be greater than 0" });
  if (typeof weight !== "number")
    return res.status(400).json({ error: "Weight must be a number" });
  if (typeof description !== "string")
    return res.status(400).json({ error: "Description must be a string" });
  if (!imagePath) return res.status(400).json({ error: "Missing imagePath" });
  if (typeof imagePath !== "string")
    return res.status(400).json({ error: "ImagePath must be a string" });
  next();
};

module.exports = { validatePostProduct };
