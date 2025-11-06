import os
import django
from dotenv import load_dotenv

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'FabulaSocialSpace.settings')
django.setup()

# Import models after Django setup
from main.models import Menu, Category

def test_menu_connection():
    print("\n=== Testing Database Connection ===")
    try:
        # Get all categories
        categories = Category.objects.all()
        print(f"\nFound {categories.count()} categories:")
        for category in categories:
            print(f"\nCategory: {category.name}")
            
            # Get menus for each category
            menus = Menu.objects.filter(category=category)
            print(f"Found {menus.count()} menus in this category:")
            
            for menu in menus:
                print(f"- {menu.name} (Rp {menu.price})")
                print(f"  Description: {menu.description}")
                print(f"  Image URL: {menu.image_url}")
                print("  ---")

        # Get menus without category
        uncategorized = Menu.objects.filter(category__isnull=True)
        if uncategorized.exists():
            print("\nUncategorized Menus:")
            for menu in uncategorized:
                print(f"- {menu.name} (Rp {menu.price})")

    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    load_dotenv()
    test_menu_connection()