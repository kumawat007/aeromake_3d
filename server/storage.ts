import { type User, type InsertUser, type Product, type InsertProduct, users, products } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";
// @ts-ignore
import MemoryStore from "memorystore";

const PostgresSessionStore = connectPg(session);
const MemorySessionStore = MemoryStore(session);

export interface IStorage {
  sessionStore: session.Store;
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    if (!pool) throw new Error("Database pool not initialized");
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db!.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db!.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db!.insert(users).values(insertUser).returning();
    return user;
  }

  async getAllProducts(): Promise<Product[]> {
    return await db!.select().from(products);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db!.select().from(products).where(eq(products.category, category));
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db!.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db!.insert(products).values(insertProduct).returning();
    return product;
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  sessionStore: session.Store;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.currentId = 1;
    this.sessionStore = new MemorySessionStore({
      checkPeriod: 86400000,
    });

    // Seed some initial products for the showcase
    const seedProducts: InsertProduct[] = [
      {
        name: "Vintage Biplane Model",
        description: "High quality 3D model of a classic WWI biplane. PBR textures included.",
        price: 49.99,
        category: "Historical",
        image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e",
        inStock: true,
        rating: 4.8,
        badge: "Best Seller"
      },
      {
        name: "Sci-Fi Drone",
        description: "Futuristic autonomous drone concept. Perfect for game assets.",
        price: 29.99,
        category: "Sci-Fi",
        image: "https://images.unsplash.com/photo-1506947411487-a56738267384",
        inStock: true,
        rating: 4.5,
        badge: "New"
      },
      {
        name: "Commercial Jet Engine",
        description: "Detailed turbofan engine cross-section. Educational standard.",
        price: 89.99,
        category: "Parts",
        image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b",
        inStock: true,
        rating: 4.9,
        badge: "Premium"
      },
      {
        name: "Glider Fuselage",
        description: "Clean aerodynamic glider body. Optimized topology.",
        price: 15.00,
        category: "Gliders",
        image: "https://images.unsplash.com/photo-1522252234503-e356532cafd5",
        inStock: true,
        rating: 4.2,
      },
    ];

    seedProducts.forEach(p => this.createProduct(p));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = (this.currentId++).toString();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.category === category);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = (this.currentId++).toString();
    const product: Product = {
      ...insertProduct,
      id,
      inStock: insertProduct.inStock ?? true,
      rating: insertProduct.rating ?? 0,
      badge: insertProduct.badge ?? null
    };
    this.products.set(id, product);
    return product;
  }
}

export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
