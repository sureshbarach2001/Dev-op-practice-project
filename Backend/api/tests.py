from django.test import TestCase

# Create your tests here.

class SimpleTest(TestCase):
    def test_addition(self):
        self.assertEqual(1 + 1, 2)

    def test_string_formatting(self):
        self.assertEqual("Hello, {}".format("World"), "Hello, World")
