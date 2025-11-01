import Product from '../models/Product.js'; 

export const getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      brand,
      minPrice,
      maxPrice,
      isOnSale,
      search,
      sortBy = 'createdAt',
      order = 'desc',
    } = req.query;

    const filter = { isActive: true };

    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (isOnSale !== undefined) filter.isOnSale = isOnSale === 'true';

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { keywords: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const sortOrder = order === 'desc' ? -1 : 1;
    const sortOptions = { [sortBy]: sortOrder };

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(filter)
      .sort(sortOptions)
      .limit(Number(limit))
      .skip(skip)
      .select('-__v')
      .populate('createdBy', 'name email');

    const totalProducts = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: products.length,
      total: totalProducts,
      page: Number(page),
      totalPages: Math.ceil(totalProducts / Number(limit)),
      data: products,
    });
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message,
    });
  }
};

export const getOneProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id)
      .select('-__v')
      .populate('createdBy', 'name email');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    if (!product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product is not available',
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Error in getOneProductDetails:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error fetching product details',
      error: error.message,
    });
  }
};
