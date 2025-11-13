import bcrypt from "bcryptjs";
import crypto from "crypto";

// Helper function to generate unique ID
const generateId = () => crypto.randomBytes(12).toString("hex");

// Helper function to generate order ID
const generateOrderId = () => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `ORD${timestamp}${random}`;
};

// User Model
export class User {
  constructor(data) {
    this._id = data._id || generateId();
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.phone = data.phone || "";
    this.role = data.role || "user";
    this.address = data.address || {};
    this.status = data.status || "active";
    this.orderCount = data.orderCount || 0;
    this.totalSpent = data.totalSpent || 0;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  static async create(data) {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    const user = new User(data);
    global.db.users.push(user);
    return user;
  }

  static async findOne(query) {
    return global.db.users.find((user) => {
      if (query.email) return user.email === query.email;
      if (query._id) return user._id === query._id;
      return false;
    });
  }

  static async findById(id) {
    return global.db.users.find((user) => user._id === id);
  }

  static async find(query = {}) {
    if (Object.keys(query).length === 0) return global.db.users;

    return global.db.users.filter((user) => {
      if (query.role) return user.role === query.role;
      if (query.status) return user.status === query.status;
      return true;
    });
  }

  static async findByIdAndUpdate(id, update) {
    const user = global.db.users.find((u) => u._id === id);
    if (user) {
      Object.assign(user, update);
      user.updatedAt = new Date();
    }
    return user;
  }

  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  async save() {
    this.updatedAt = new Date();
    const index = global.db.users.findIndex((u) => u._id === this._id);
    if (index !== -1) {
      global.db.users[index] = this;
    }
    return this;
  }

  async deleteOne() {
    const index = global.db.users.findIndex((u) => u._id === this._id);
    if (index !== -1) {
      global.db.users.splice(index, 1);
    }
  }
}

// Vendor Model
export class Vendor {
  constructor(data) {
    this._id = data._id || generateId();
    this.userId = data.userId;
    this.storeName = data.storeName;
    this.category = data.category;
    this.description = data.description || "";
    this.location = data.location || "";
    this.rating = data.rating || 0;
    this.totalProducts = data.totalProducts || 0;
    this.totalRevenue = data.totalRevenue || 0;
    this.status = data.status || "pending";
    this.approvedAt = data.approvedAt || null;
    this.approvedBy = data.approvedBy || null;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  static async create(data) {
    const vendor = new Vendor(data);
    global.db.vendors.push(vendor);
    return vendor;
  }

  static async findOne(query) {
    return global.db.vendors.find((vendor) => {
      if (query.userId) return vendor.userId === query.userId;
      if (query._id) return vendor._id === query._id;
      return false;
    });
  }

  static async findById(id) {
    return global.db.vendors.find((vendor) => vendor._id === id);
  }

  static async find(query = {}) {
    if (Object.keys(query).length === 0) return global.db.vendors;

    return global.db.vendors.filter((vendor) => {
      if (query.status) return vendor.status === query.status;
      if (query.category) return vendor.category === query.category;
      return true;
    });
  }

  static async findByIdAndUpdate(id, update, options = {}) {
    const vendor = global.db.vendors.find((v) => v._id === id);
    if (vendor) {
      Object.assign(vendor, update);
      vendor.updatedAt = new Date();
    }
    return vendor;
  }

  async save() {
    this.updatedAt = new Date();
    return this;
  }
}

// Product Model
export class Product {
  constructor(data) {
    this._id = data._id || generateId();
    this.vendorId = data.vendorId;
    this.name = data.name;
    this.description = data.description || "";
    this.price = data.price;
    this.originalPrice = data.originalPrice || data.price;
    this.discount = data.discount || 0;
    this.category = data.category;
    this.images = data.images || [];
    this.stock = data.stock || 0;
    this.sold = data.sold || 0;
    this.rating = data.rating || 0;
    this.reviewCount = data.reviewCount || 0;
    this.status = data.status || "active";
    this.specifications = data.specifications || {};
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  static async create(data) {
    const product = new Product(data);
    global.db.products.push(product);
    return product;
  }

  static async insertMany(products) {
    const created = products.map((p) => new Product(p));
    global.db.products.push(...created);
    return created;
  }

  static async findById(id) {
    return global.db.products.find((product) => product._id === id);
  }

  static async find(query = {}) {
    let products = global.db.products;

    if (query.vendorId) {
      products = products.filter((p) => p.vendorId === query.vendorId);
    }
    if (query.status) {
      products = products.filter((p) => p.status === query.status);
    }
    if (query.category) {
      products = products.filter((p) => p.category === query.category);
    }

    return products;
  }

  static async findByIdAndUpdate(id, update, options = {}) {
    const product = global.db.products.find((p) => p._id === id);
    if (product) {
      Object.assign(product, update);
      product.updatedAt = new Date();
    }
    return options.new ? product : product;
  }

  async save() {
    this.updatedAt = new Date();
    return this;
  }

  async deleteOne() {
    const index = global.db.products.findIndex((p) => p._id === this._id);
    if (index !== -1) {
      global.db.products.splice(index, 1);
    }
  }

  sort() {
    return this;
  }
  populate() {
    return this;
  }
}

// Order Model
export class Order {
  constructor(data) {
    this._id = data._id || generateId();
    this.orderId = data.orderId || generateOrderId();
    this.userId = data.userId;
    this.items = data.items || [];
    this.customerInfo = data.customerInfo || {};
    this.amounts = data.amounts || {};
    this.status = data.status || "confirmed";
    this.paymentStatus = data.paymentStatus || "pending";
    this.trackingInfo = data.trackingInfo || {
      status: "confirmed",
      updates: [
        {
          status: "confirmed",
          message: "Order confirmed",
          timestamp: new Date(),
        },
      ],
    };
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  static async create(data) {
    const order = new Order(data);
    global.db.orders.push(order);
    return order;
  }

  static async findById(id) {
    return global.db.orders.find((order) => order._id === id);
  }

  static async find(query = {}) {
    let orders = global.db.orders;

    if (query.userId) {
      orders = orders.filter((o) => o.userId === query.userId);
    }
    if (query.status) {
      orders = orders.filter((o) => o.status === query.status);
    }
    if (query.paymentStatus) {
      orders = orders.filter((o) => o.paymentStatus === query.paymentStatus);
    }
    if (query["items.vendorId"]) {
      const vendorId = query["items.vendorId"];
      orders = orders.filter((o) =>
        o.items.some((item) => item.vendorId === vendorId)
      );
    }

    return orders;
  }

  async save() {
    this.updatedAt = new Date();
    return this;
  }

  sort() {
    return this;
  }
  populate() {
    return this;
  }
}

// Static method helpers for queries
Product.prototype.sort = function () {
  return this;
};
Product.prototype.populate = function () {
  return this;
};
Order.prototype.sort = function () {
  return this;
};
Order.prototype.populate = function () {
  return this;
};

export default { User, Vendor, Product, Order };
