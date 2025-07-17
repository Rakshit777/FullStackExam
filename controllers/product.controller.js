import Product from '../models/mongodb/product.js';

export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const search = req.query.search || '';

    const query = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ],
    };

    const total = await Product.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ products, totalPages });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
        res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ message : "Internal Server Error"});
    
  }
};

export const getCategorySummary = async (req, res) => {
  try {
    const summary = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          totalProducts: { $sum: 1 },
          avgPrice: { $avg: '$price' }
        }
      }
    ]);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
