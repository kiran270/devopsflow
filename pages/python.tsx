import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import { Code, Package, Database, Zap } from 'lucide-react'

export default function Python() {
  const [scenario, setScenario] = useState<'intro' | 'basics' | 'datastructures' | 'oop' | 'modules' | 'async' | 'web' | 'usecases'>('intro')

  const scenarios = {
    intro: {
      name: 'Introduction to Python',
      description: 'Learn Python programming fundamentals',
      steps: [
        {
          title: 'Why Python?',
          code: `Python is a high-level, interpreted programming language.

Key Features:
• Easy to Learn - Simple, readable syntax
• Versatile - Web, Data Science, AI, Automation
• Huge Ecosystem - 300,000+ packages on PyPI
• Cross-platform - Works on Windows, Mac, Linux
• Great Community - Extensive documentation and support

Popular Use Cases:
• Web Development (Django, Flask, FastAPI)
• Data Science & ML (Pandas, NumPy, TensorFlow)
• Automation & Scripting
• DevOps & Infrastructure (Ansible, Fabric)
• Scientific Computing`,
          explanation: 'Python is one of the most popular programming languages in the world.',
          concept: 'Python Overview',
          useCase: '🎯 Used by Google, Netflix, Instagram, NASA, and millions of developers'
        },
        {
          title: 'Python Basics',
          code: `# Variables and Data Types
name = "DevOpsFlow"
age = 25
price = 99.99
is_active = True

# Lists (arrays)
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]

# Dictionaries (objects)
user = {
    "name": "John",
    "age": 30,
    "email": "john@example.com"
}

# Functions
def greet(name):
    return f"Hello, {name}!"

# Conditionals
if age >= 18:
    print("Adult")
else:
    print("Minor")

# Loops
for fruit in fruits:
    print(fruit)

for i in range(5):
    print(i)  # 0, 1, 2, 3, 4`,
          explanation: 'Python syntax is clean and easy to read.',
          concept: 'Basic Syntax',
          useCase: '💻 Foundation for all Python programming'
        }
      ]
    },
    basics: {
      name: 'Python Fundamentals',
      description: 'Core Python concepts and syntax',
      steps: [
        {
          title: 'Data Types & Operations',
          code: `# Strings
text = "Hello, World!"
print(text.upper())           # HELLO, WORLD!
print(text.lower())           # hello, world!
print(text.split(","))        # ['Hello', ' World!']
print(f"Message: {text}")     # f-strings (formatted strings)

# Numbers
x = 10
y = 3
print(x + y)    # 13
print(x - y)    # 7
print(x * y)    # 30
print(x / y)    # 3.333...
print(x // y)   # 3 (integer division)
print(x % y)    # 1 (modulo)
print(x ** y)   # 1000 (power)

# Lists
numbers = [1, 2, 3, 4, 5]
numbers.append(6)              # Add to end
numbers.insert(0, 0)           # Insert at position
numbers.remove(3)              # Remove value
numbers.pop()                  # Remove last
print(numbers[0])              # First element
print(numbers[-1])             # Last element
print(numbers[1:3])            # Slice [1, 2]

# List Comprehension
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]`,
          explanation: 'Master Python data types and operations.',
          concept: 'Data Types',
          useCase: '🔢 Essential for data manipulation'
        },
        {
          title: 'Functions & Lambda',
          code: `# Regular Function
def calculate_total(price, tax_rate=0.1):
    """Calculate total with tax"""
    tax = price * tax_rate
    return price + tax

total = calculate_total(100)        # 110.0
total = calculate_total(100, 0.15)  # 115.0

# Multiple Return Values
def get_user():
    return "John", 30, "john@example.com"

name, age, email = get_user()

# *args and **kwargs
def sum_all(*args):
    return sum(args)

print(sum_all(1, 2, 3, 4))  # 10

def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="John", age=30)

# Lambda Functions (Anonymous)
square = lambda x: x ** 2
add = lambda x, y: x + y

# Map, Filter, Reduce
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
evens = list(filter(lambda x: x % 2 == 0, numbers))`,
          explanation: 'Functions are reusable blocks of code.',
          concept: 'Functions',
          useCase: '🔧 Code organization and reusability'
        }
      ]
    },
    datastructures: {
      name: 'Data Structures',
      description: 'Python collections and data structures',
      steps: [
        {
          title: 'Lists, Tuples, Sets, Dicts',
          code: `# Lists (mutable, ordered)
fruits = ["apple", "banana", "orange"]
fruits.append("grape")
fruits[0] = "mango"

# Tuples (immutable, ordered)
coordinates = (10, 20)
x, y = coordinates  # Unpacking

# Sets (unique, unordered)
unique_numbers = {1, 2, 3, 3, 4}  # {1, 2, 3, 4}
unique_numbers.add(5)
unique_numbers.remove(1)

# Set Operations
set1 = {1, 2, 3}
set2 = {3, 4, 5}
print(set1 | set2)  # Union: {1, 2, 3, 4, 5}
print(set1 & set2)  # Intersection: {3}
print(set1 - set2)  # Difference: {1, 2}

# Dictionaries (key-value pairs)
user = {
    "name": "John",
    "age": 30,
    "email": "john@example.com"
}

# Dictionary Operations
print(user["name"])           # John
print(user.get("phone", "N/A"))  # N/A (default)
user["age"] = 31              # Update
user["phone"] = "123-456"     # Add new key

# Iterate
for key, value in user.items():
    print(f"{key}: {value}")`,
          explanation: 'Choose the right data structure for your needs.',
          concept: 'Collections',
          useCase: '📊 Efficient data storage and retrieval'
        }
      ]
    },
    oop: {
      name: 'Object-Oriented Programming',
      description: 'Classes, objects, and OOP principles',
      steps: [
        {
          title: 'Classes and Objects',
          code: `# Define a Class
class User:
    # Class variable (shared by all instances)
    total_users = 0
    
    # Constructor
    def __init__(self, name, email):
        self.name = name      # Instance variable
        self.email = email
        User.total_users += 1
    
    # Instance method
    def greet(self):
        return f"Hello, I'm {self.name}"
    
    # String representation
    def __str__(self):
        return f"User({self.name}, {self.email})"
    
    # Class method
    @classmethod
    def get_total_users(cls):
        return cls.total_users
    
    # Static method
    @staticmethod
    def is_valid_email(email):
        return "@" in email

# Create objects
user1 = User("John", "john@example.com")
user2 = User("Jane", "jane@example.com")

print(user1.greet())              # Hello, I'm John
print(User.get_total_users())     # 2
print(User.is_valid_email("test@example.com"))  # True`,
          explanation: 'OOP helps organize code into reusable, maintainable structures.',
          concept: 'Classes & Objects',
          useCase: '🏗️ Build scalable applications'
        },
        {
          title: 'Inheritance & Polymorphism',
          code: `# Base Class
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        pass  # Abstract method

# Derived Classes
class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

# Polymorphism
animals = [Dog("Buddy"), Cat("Whiskers")]
for animal in animals:
    print(animal.speak())

# Multiple Inheritance
class Flyable:
    def fly(self):
        return "Flying!"

class Bird(Animal, Flyable):
    def speak(self):
        return f"{self.name} says Tweet!"

bird = Bird("Tweety")
print(bird.speak())  # Tweety says Tweet!
print(bird.fly())    # Flying!`,
          explanation: 'Inheritance allows code reuse and polymorphism enables flexibility.',
          concept: 'Inheritance',
          useCase: '🔄 Code reuse and extensibility'
        }
      ]
    },
    modules: {
      name: 'Modules & Packages',
      description: 'Organizing code and using external libraries',
      steps: [
        {
          title: 'Importing Modules',
          code: `# Import entire module
import math
print(math.pi)        # 3.14159...
print(math.sqrt(16))  # 4.0

# Import specific functions
from math import pi, sqrt
print(pi)
print(sqrt(16))

# Import with alias
import numpy as np
import pandas as pd

# Your own modules
# File: utils.py
def greet(name):
    return f"Hello, {name}"

# File: main.py
from utils import greet
print(greet("World"))

# Package structure
# mypackage/
#   __init__.py
#   module1.py
#   module2.py

from mypackage import module1
from mypackage.module2 import function`,
          explanation: 'Modules help organize code into reusable files.',
          concept: 'Modules',
          useCase: '📦 Code organization and reusability'
        }
      ]
    },
    async: {
      name: 'Async Programming',
      description: 'Asynchronous programming with asyncio',
      steps: [
        {
          title: 'Async/Await',
          code: `import asyncio
import aiohttp

# Async function
async def fetch_data(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.json()

# Run multiple tasks concurrently
async def main():
    urls = [
        'https://api.example.com/users/1',
        'https://api.example.com/users/2',
        'https://api.example.com/users/3'
    ]
    
    # Run concurrently
    tasks = [fetch_data(url) for url in urls]
    results = await asyncio.gather(*tasks)
    
    for result in results:
        print(result)

# Run async code
asyncio.run(main())

# Async with delay
async def delayed_task(name, delay):
    print(f"{name} starting...")
    await asyncio.sleep(delay)
    print(f"{name} completed after {delay}s")
    return f"{name} result"

async def run_tasks():
    tasks = [
        delayed_task("Task 1", 2),
        delayed_task("Task 2", 1),
        delayed_task("Task 3", 3)
    ]
    results = await asyncio.gather(*tasks)
    print(results)

asyncio.run(run_tasks())`,
          explanation: 'Async programming enables concurrent execution for I/O-bound tasks.',
          concept: 'Async/Await',
          useCase: '⚡ High-performance I/O operations'
        }
      ]
    },
    web: {
      name: 'Web Development',
      description: 'Building web applications with Python',
      steps: [
        {
          title: 'FastAPI REST API',
          code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Data model
class User(BaseModel):
    id: int
    name: str
    email: str

# In-memory database
users_db = []

# Routes
@app.get("/")
async def root():
    return {"message": "Welcome to the API"}

@app.get("/users", response_model=List[User])
async def get_users():
    return users_db

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    user = next((u for u in users_db if u.id == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/users", response_model=User)
async def create_user(user: User):
    users_db.append(user)
    return user

@app.put("/users/{user_id}")
async def update_user(user_id: int, user: User):
    index = next((i for i, u in enumerate(users_db) if u.id == user_id), None)
    if index is None:
        raise HTTPException(status_code=404, detail="User not found")
    users_db[index] = user
    return user

@app.delete("/users/{user_id}")
async def delete_user(user_id: int):
    global users_db
    users_db = [u for u in users_db if u.id != user_id]
    return {"message": "User deleted"}

# Run: uvicorn main:app --reload`,
          explanation: 'FastAPI is a modern, fast web framework for building APIs.',
          concept: 'REST API',
          useCase: '🌐 Build high-performance web APIs'
        }
      ]
    },
    usecases: {
      name: 'Real-World Use Cases',
      description: 'Practical Python examples used in production',
      steps: []
    }
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 min-h-[calc(100vh-80px)] flex flex-col pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-2 sm:mb-3 flex-shrink-0"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
            Python Tutorial
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm px-2">
            Learn Python programming from basics to advanced
          </p>
        </motion.div>

        {/* Scenario Selection */}
        <motion.div
          className="glass-card p-3 mb-3 flex-shrink-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setScenario('intro')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'intro' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              📖 Introduction
            </button>
            <button
              onClick={() => setScenario('basics')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'basics' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Code size={14} />
              Basics
            </button>
            <button
              onClick={() => setScenario('datastructures')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'datastructures' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Database size={14} />
              Data Structures
            </button>
            <button
              onClick={() => setScenario('oop')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'oop' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              🏗️ OOP
            </button>
            <button
              onClick={() => setScenario('modules')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'modules' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Package size={14} />
              Modules
            </button>
            <button
              onClick={() => setScenario('async')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'async' 
                  ? 'bg-cyan-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Zap size={14} />
              Async
            </button>
            <button
              onClick={() => setScenario('web')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'web' 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              🌐 Web Dev
            </button>
            <button
              onClick={() => setScenario('usecases')}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                scenario === 'usecases' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              💼 Use Cases
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 lg:min-h-0 lg:overflow-hidden">
          <motion.div
            className="glass-card p-3 sm:p-4 flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2 flex-shrink-0">
              {scenarios[scenario].name}
            </h2>
            <div className="flex-1 min-h-0 overflow-auto custom-scrollbar">
              {/* Description */}
              <div className="glass-card p-2 sm:p-3 bg-white/5 mb-3">
                <p className="text-xs text-gray-300">
                  {scenarios[scenario].description}
                </p>
              </div>

              {/* Show Use Cases or Content based on scenario */}
              {scenario === 'usecases' ? (
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
                    <span className="text-xl">💼</span>
                    Real-World Python Use Cases
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Use Case 1: File Automation */}
                    <div className="glass-card p-3 sm:p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                      <h4 className="font-semibold text-base sm:text-lg mb-2">
                        🤖 File Organization Automation
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-300 mb-3">
                        Automate file organization and system tasks
                      </p>
                      <div className="bg-black/30 p-2 sm:p-3 rounded-lg overflow-x-auto">
                        <pre className="text-[10px] sm:text-xs text-green-400">
{`import os
import shutil
from pathlib import Path
from datetime import datetime

def organize_downloads():
    downloads = Path.home() / "Downloads"
    
    # File type categories
    categories = {
        'Images': ['.jpg', '.png', '.gif', '.svg', '.webp'],
        'Documents': ['.pdf', '.doc', '.docx', '.txt', '.xlsx'],
        'Videos': ['.mp4', '.avi', '.mkv', '.mov'],
        'Archives': ['.zip', '.tar', '.gz', '.rar'],
        'Code': ['.py', '.js', '.html', '.css', '.json']
    }
    
    organized_count = 0
    
    for file in downloads.iterdir():
        if file.is_file():
            ext = file.suffix.lower()
            
            for category, extensions in categories.items():
                if ext in extensions:
                    # Create category folder
                    category_path = downloads / category
                    category_path.mkdir(exist_ok=True)
                    
                    # Handle duplicate names
                    dest = category_path / file.name
                    if dest.exists():
                        name = file.stem
                        dest = category_path / f"{name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}{ext}"
                    
                    # Move file
                    shutil.move(str(file), str(dest))
                    print(f"✓ Moved {file.name} to {category}")
                    organized_count += 1
                    break
    
    print(f"\\n✨ Organized \{organized_count\} files!")

if __name__ == "__main__":
    organize_downloads()`}
                        </pre>
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        💡 Perfect for: Cleaning downloads folder, organizing project files
                      </div>
                    </div>

                    {/* Use Case 2: Web Scraping */}
                    <div className="glass-card p-3 sm:p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                      <h4 className="font-semibold text-base sm:text-lg mb-2">
                        🕷️ Web Scraping & Data Collection
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-300 mb-3">
                        Extract data from websites automatically
                      </p>
                      <div className="bg-black/30 p-2 sm:p-3 rounded-lg overflow-x-auto">
                        <pre className="text-[10px] sm:text-xs text-green-400">
{`import requests
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime

def scrape_news():
    """Scrape news headlines and save to CSV"""
    url = "https://news.ycombinator.com"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    articles = []
    
    # Find all article titles
    for item in soup.find_all('span', class_='titleline'):
        title = item.get_text()
        link = item.find('a')['href']
        
        articles.append({
            'title': title,
            'link': link,
            'scraped_at': datetime.now()
        })
    
    # Save to CSV
    df = pd.DataFrame(articles)
    filename = f"news_{datetime.now().strftime('%Y%m%d')}.csv"
    df.to_csv(filename, index=False)
    print(f"✓ Scraped {len(articles)} articles")
    print(f"✓ Saved to {filename}")
    
    return articles

def scrape_with_pagination():
    """Scrape multiple pages"""
    all_data = []
    
    for page in range(1, 6):  # Scrape 5 pages
        url = f"https://example.com/page/{page}"
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract data
        items = soup.find_all('div', class_='item')
        for item in items:
            all_data.append({
                'title': item.find('h2').get_text(),
                'price': item.find('span', class_='price').get_text(),
                'page': page
            })
        
        print(f"✓ Scraped page {page}")
    
    return all_data

if __name__ == "__main__":
    articles = scrape_news()
    print(f"\\nTop 5 articles:")
    for i, article in enumerate(articles[:5], 1):
        print(f"{i}. {article['title']}")`}
                        </pre>
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        💡 Use for: Price monitoring, data collection, market research
                      </div>
                    </div>

                    {/* Use Case 3: Data Analysis */}
                    <div className="glass-card p-3 sm:p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                      <h4 className="font-semibold text-base sm:text-lg mb-2">
                        📊 Data Analysis with Pandas
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-300 mb-3">
                        Analyze and visualize data efficiently
                      </p>
                      <div className="bg-black/30 p-2 sm:p-3 rounded-lg overflow-x-auto">
                        <pre className="text-[10px] sm:text-xs text-green-400">
{`import pandas as pd
import matplotlib.pyplot as plt

def analyze_sales_data():
    """Analyze sales data and generate insights"""
    
    # Load data
    df = pd.read_csv('sales.csv')
    
    # Basic info
    print("Dataset shape:", df.shape)
    print("\\nFirst 5 rows:")
    print(df.head())
    
    # Data cleaning
    df['date'] = pd.to_datetime(df['date'])
    df = df.dropna()  # Remove missing values
    df = df[df['amount'] > 0]  # Remove invalid amounts
    
    # Analysis
    print("\\n=== Sales Analysis ===")
    print(f"Total Revenue: $\{df['amount'].sum():,.2f\}")
    print(f"Average Order: $\{df['amount'].mean():,.2f\}")
    print(f"Total Orders: \{len(df):,\}")
    
    # Group by product
    product_sales = df.groupby('product')['amount'].agg([
        ('total', 'sum'),
        ('count', 'count'),
        ('average', 'mean')
    ]).sort_values('total', ascending=False)
    
    print("\\nTop 5 Products:")
    print(product_sales.head())
    
    # Monthly trends
    df['month'] = df['date'].dt.to_period('M')
    monthly_sales = df.groupby('month')['amount'].sum()
    
    # Visualization
    plt.figure(figsize=(12, 6))
    
    # Plot 1: Monthly sales trend
    plt.subplot(1, 2, 1)
    monthly_sales.plot(kind='line', marker='o')
    plt.title('Monthly Sales Trend')
    plt.xlabel('Month')
    plt.ylabel('Revenue ($)')
    plt.grid(True)
    
    # Plot 2: Top products
    plt.subplot(1, 2, 2)
    product_sales.head(10)['total'].plot(kind='barh')
    plt.title('Top 10 Products by Revenue')
    plt.xlabel('Revenue ($)')
    
    plt.tight_layout()
    plt.savefig('sales_analysis.png')
    print("\\n✓ Analysis complete! Chart saved to sales_analysis.png")

if __name__ == "__main__":
    analyze_sales_data()`}
                        </pre>
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        💡 Essential for: Business intelligence, reporting, data science
                      </div>
                    </div>

                    {/* Use Case 4: API Development */}
                    <div className="glass-card p-3 sm:p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
                      <h4 className="font-semibold text-base sm:text-lg mb-2">
                        🌐 Production REST API
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-300 mb-3">
                        Build scalable APIs with authentication and database
                      </p>
                      <div className="bg-black/30 p-2 sm:p-3 rounded-lg overflow-x-auto">
                        <pre className="text-[10px] sm:text-xs text-green-400">
{`from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import jwt
from datetime import datetime, timedelta

# Database setup
DATABASE_URL = "postgresql://user:password@localhost/dbname"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# Models
class UserDB(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    name = Column(String)
    hashed_password = Column(String)

Base.metadata.create_all(bind=engine)

# Pydantic models
class UserCreate(BaseModel):
    email: EmailStr
    name: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    name: str

# FastAPI app
app = FastAPI(title="Production API", version="1.0.0")
security = HTTPBearer()

SECRET_KEY = "your-secret-key"

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Authentication
def create_token(user_id: int):
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(days=1)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=["HS256"])
        return payload["user_id"]
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

# Routes
@app.post("/register", response_model=UserResponse)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user exists
    existing = db.query(UserDB).filter(UserDB.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user (hash password in production!)
    db_user = UserDB(
        email=user.email,
        name=user.name,
        hashed_password=user.password  # Use bcrypt in production!
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

@app.get("/users/me", response_model=UserResponse)
async def get_current_user(
    user_id: int = Depends(verify_token),
    db: Session = Depends(get_db)
):
    user = db.query(UserDB).filter(UserDB.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Run: uvicorn main:app --reload`}
                        </pre>
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        💡 Powers: SaaS applications, mobile backends, microservices
                      </div>
                    </div>

                    {/* Use Case 5: Task Automation */}
                    <div className="glass-card p-3 sm:p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                      <h4 className="font-semibold text-base sm:text-lg mb-2">
                        ⚙️ DevOps Automation
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-300 mb-3">
                        Automate deployment and infrastructure tasks
                      </p>
                      <div className="bg-black/30 p-2 sm:p-3 rounded-lg overflow-x-auto">
                        <pre className="text-[10px] sm:text-xs text-green-400">
{`import subprocess
import requests
import time
from pathlib import Path

def deploy_application():
    """Automated deployment script"""
    
    print("🚀 Starting deployment...")
    
    # 1. Pull latest code
    print("\\n📥 Pulling latest code...")
    subprocess.run(["git", "pull", "origin", "main"], check=True)
    
    # 2. Install dependencies
    print("\\n📦 Installing dependencies...")
    subprocess.run(["npm", "install"], check=True)
    
    # 3. Run tests
    print("\\n🧪 Running tests...")
    result = subprocess.run(["npm", "test"], capture_output=True)
    if result.returncode != 0:
        print("❌ Tests failed! Aborting deployment.")
        return False
    print("✅ All tests passed!")
    
    # 4. Build application
    print("\\n🔨 Building application...")
    subprocess.run(["npm", "run", "build"], check=True)
    
    # 5. Backup current version
    print("\\n💾 Creating backup...")
    timestamp = time.strftime("%Y%m%d_%H%M%S")
    subprocess.run([
        "tar", "-czf", 
        f"/backup/app_backup_{timestamp}.tar.gz",
        "/var/www/app"
    ])
    
    # 6. Deploy new version
    print("\\n📤 Deploying new version...")
    subprocess.run([
        "rsync", "-av", "--delete",
        "./build/", "/var/www/app/"
    ], check=True)
    
    # 7. Restart services
    print("\\n🔄 Restarting services...")
    subprocess.run(["sudo", "systemctl", "restart", "nginx"], check=True)
    subprocess.run(["sudo", "systemctl", "restart", "app"], check=True)
    
    # 8. Health check
    print("\\n🏥 Running health check...")
    time.sleep(5)  # Wait for services to start
    
    try:
        response = requests.get("http://localhost/health", timeout=10)
        if response.status_code == 200:
            print("✅ Health check passed!")
        else:
            print(f"⚠️  Health check returned {response.status_code}")
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        return False
    
    # 9. Send notification
    print("\\n📧 Sending notification...")
    send_slack_notification("✅ Deployment successful!")
    
    print("\\n🎉 Deployment completed successfully!")
    return True

def send_slack_notification(message):
    webhook_url = "https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
    requests.post(webhook_url, json={"text": message})

if __name__ == "__main__":
    success = deploy_application()
    exit(0 if success else 1)`}
                        </pre>
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        💡 Automates: Deployments, backups, monitoring, notifications
                      </div>
                    </div>

                    {/* Use Case 6: Machine Learning */}
                    <div className="glass-card p-3 sm:p-4 bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20">
                      <h4 className="font-semibold text-base sm:text-lg mb-2">
                        🤖 Machine Learning Model
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-300 mb-3">
                        Build and deploy ML models for predictions
                      </p>
                      <div className="bg-black/30 p-2 sm:p-3 rounded-lg overflow-x-auto">
                        <pre className="text-[10px] sm:text-xs text-green-400">
{`import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

def train_model():
    """Train a machine learning model"""
    
    # Load data
    df = pd.read_csv('customer_data.csv')
    
    # Prepare features
    X = df[['age', 'income', 'purchases', 'days_active']]
    y = df['will_churn']  # Target: 0 or 1
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Train model
    print("🎓 Training model...")
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"\\n✅ Model trained!")
    print(f"Accuracy: {accuracy:.2%}")
    print("\\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    # Feature importance
    feature_importance = pd.DataFrame({
        'feature': X.columns,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print("\\nFeature Importance:")
    print(feature_importance)
    
    # Save model
    joblib.dump(model, 'churn_model.pkl')
    print("\\n💾 Model saved to churn_model.pkl")
    
    return model

def predict_churn(customer_data):
    """Predict if customer will churn"""
    model = joblib.load('churn_model.pkl')
    prediction = model.predict([customer_data])
    probability = model.predict_proba([customer_data])[0][1]
    
    return {
        'will_churn': bool(prediction[0]),
        'churn_probability': f"{probability:.1%}"
    }

if __name__ == "__main__":
    # Train model
    model = train_model()
    
    # Make prediction
    new_customer = [35, 50000, 12, 180]  # age, income, purchases, days_active
    result = predict_churn(new_customer)
    print(f"\\n🔮 Prediction: {result}")`}
                        </pre>
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        💡 Applications: Churn prediction, fraud detection, recommendations
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Terminal-style Steps Display */
                <div className="space-y-3">
                  {scenarios[scenario].steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-card p-3 bg-white/5"
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-yellow-500 flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm sm:text-base mb-1">{step.title}</h3>
                          <p className="text-xs text-gray-400 mb-2">{step.explanation}</p>
                        </div>
                      </div>

                      {/* Code Block */}
                      <div className="bg-black/50 rounded-lg p-2 sm:p-3 mb-2 overflow-x-auto">
                        <pre className="text-[10px] sm:text-xs text-green-400 whitespace-pre-wrap break-words">
                          {step.code}
                        </pre>
                      </div>

                      {/* Metadata */}
                      <div className="flex flex-wrap gap-2 text-[10px] sm:text-xs">
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded">
                          {step.concept}
                        </span>
                        <span className="text-gray-400">{step.useCase}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
