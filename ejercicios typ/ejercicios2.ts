// 1. Interface Vehicle, Car y Motorcycle
interface Vehicle {
  model: string;
  year: number;
  color: string;
}

interface Car extends Vehicle {
  numDoors: number;
}

interface Motorcycle extends Vehicle {
  engineDisplacement: number;
}

class MyCar implements Car {
  model: string;
  year: number;
  color: string;
  numDoors: number;

  constructor(model: string, year: number, color: string, numDoors: number) {
    this.model = model;
    this.year = year;
    this.color = color;
    this.numDoors = numDoors;
  }
}

class MyMotorcycle implements Motorcycle {
  model: string;
  year: number;
  color: string;
  engineDisplacement: number;

  constructor(model: string, year: number, color: string, engineDisplacement: number) {
    this.model = model;
    this.year = year;
    this.color = color;
    this.engineDisplacement = engineDisplacement;
  }
}

const myCar = new MyCar("Sedan", 2022, "rojo", 4);
const myMotorcycle = new MyMotorcycle("Sport", 2021, "negro", 600);

console.log("Mi coche:", myCar);
console.log("Mi motocicleta:", myMotorcycle);
console.log("\n");





// 2. Interface User y Admin
interface User {
  name: string;
  email: string;
}

interface Admin extends User {
  permissions: string[];
}

function printUserData(user: User | Admin): void {
  console.log(`Nombre: ${user.name}`);
  console.log(`Email: ${user.email}`);
  if ((user as Admin).permissions) {
    console.log(`Permisos de administrador: ${(user as Admin).permissions.join(", ")}`);
  }
}

const regularUser: User = { name: "Juan", email: "juan@example.com" };
const adminUser: Admin = { name: "Maria", email: "maria@admin.com", permissions: ["read", "write", "delete"] };

printUserData(regularUser);
console.log("\n");
printUserData(adminUser);
console.log("\n");





// 3. Interface Product e Inventory
interface Product {
  name: string;
  price: number;
}

interface Inventory {
  products: Product[];
  addProduct(product: Product): void;
  findProduct(name: string): Product | undefined;
}

class MyInventory implements Inventory {
  products: Product[] = [];

  addProduct(product: Product): void {
    this.products.push(product);
    console.log(`${product.name} agregado al inventario.`);
  }

  findProduct(name: string): Product | undefined {
    return this.products.find(p => p.name.toLowerCase() === name.toLowerCase());
  }
}

const inventory = new MyInventory();
inventory.addProduct({ name: "Laptop", price: 1200 });
inventory.addProduct({ name: "Mouse", price: 25 });

const foundProduct = inventory.findProduct("laptop");
if (foundProduct) {
  console.log("Producto encontrado:", foundProduct);
} else {
  console.log("Producto no encontrado.");
}
console.log("\n");





// 4. Interface BaseObject, User, Product, Order y función genérica
interface BaseObject {
  id: number;
}

interface UserWithId extends BaseObject {
  name: string;
  email: string;
}

interface ProductWithId extends BaseObject {
  name: string;
  price: number;
}

interface Order extends BaseObject {
  userId: number;
  items: { productId: number; quantity: number }[];
  total: number;
}

function printObjectData<T extends BaseObject>(obj: T): void {
  console.log(`ID: ${obj.id}`);
  for (const key in obj) {
    if (key !== "id" && Object.prototype.hasOwnProperty.call(obj, key)) {
      console.log(`${key}: ${(obj as any)[key]}`);
    }
  }
}

const userWithId: UserWithId = { id: 1, name: "Elena", email: "elena@example.com" };
const productWithId: ProductWithId = { id: 101, name: "Keyboard", price: 75 };
const order: Order = { id: 50, userId: 1, items: [{ productId: 101, quantity: 2 }], total: 150 };

console.log("Datos del usuario:");
printObjectData(userWithId);
console.log("\nDatos del producto:");
printObjectData(productWithId);
console.log("\nDatos de la orden:");
printObjectData(order);
console.log("\n");





// 5. Interface Database y clases de implementación
interface Database {
  connect(): void;
  find(id: number, table: string): any | undefined;
  update(id: number, table: string, data: any): void;
}

class MySQLDatabase implements Database {
  connect(): void {
    console.log("Conectando a la base de datos MySQL...");
  }

  find(id: number, table: string): any | undefined {
    console.log(`Buscando registro con ID ${id} en la tabla ${table} (MySQL).`);
    
    if (id === 1 && table === "users") {
      return { id: 1, name: "Ricardo", email: "ricardo@example.com" };
    }
    return undefined;
  }

  update(id: number, table: string, data: any): void {
    console.log(`Actualizando registro con ID ${id} en la tabla ${table} (MySQL) con datos:`, data);
  }
}

class SQLiteDatabase implements Database {
  connect(): void {
    console.log("Conectando a la base de datos SQLite...");
  }

  find(id: number, table: string): any | undefined {
    console.log(`Buscando registro con ID ${id} en la tabla ${table} (SQLite).`);
   
    if (id === 101 && table === "products") {
      return { id: 101, name: "Monitor", price: 300 };
    }
    return undefined;
  }

  update(id: number, table: string, data: any): void {
    console.log(`Actualizando registro con ID ${id} en la tabla ${table} (SQLite) con datos:`, data);
  }
}

const mysqlDb = new MySQLDatabase();
mysqlDb.connect();
const mysqlUser = mysqlDb.find(1, "users");
console.log("Usuario MySQL encontrado:", mysqlUser);
mysqlDb.update(1, "users", { email: "new_ricardo@example.com" });
console.log("\n");

const sqliteDb = new SQLiteDatabase();
sqliteDb.connect();
const sqliteProduct = sqliteDb.find(101, "products");
console.log("Producto SQLite encontrado:", sqliteProduct);
sqliteDb.update(101, "products", { price: 320 });