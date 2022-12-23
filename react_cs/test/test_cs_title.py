import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains
from selenium.webdriver.chrome.options import Options
import time

class CSTitle(unittest.TestCase):

    def setUp(self):
        chrome_options = Options()

        # detach False - closes browser after test completed
        # detach True - Keeps the browser on after test completed
        chrome_options.add_experimental_option("detach", False)
        self.driver = webdriver.Chrome(chrome_options=chrome_options)


    def test_title_in_cloudskin(self):
        driver = self.driver
        driver.get("http://localhost:3000")
        self.assertIn("cloudskin", driver.title)
        time.sleep(2)

        #start here
        element = driver.find_element(By.ID, "App")
        target = driver.find_element(By.ID, "main-canvas")

        action_chains = ActionChains(driver)
        action_chains.drag_and_drop(element, target).perform()
        # end here
        time.sleep(2)
        element = driver.find_element(By.ID, "save_update")
        print('here is button accessible name  ', element)
        element.click()


    # def test_test_save_graph(self):
    #     driver = self.driver
    #     driver.get("http://localhost:3000")
    #     element = driver.find_element(By.ID, "save_update")
    #     print('here is button accessible name  ', element.accessible_name)

    def tearDown(self):
        # self.driver.close()
        pass

if __name__ == "__main__":
    unittest.main()


'''
USAGE 1
------
(venv) kannappannatarasan@kanna-mac test % python test_cs_title.py 
.
----------------------------------------------------------------------
Ran 1 test in 4.615s

OK
(venv) kannappannatarasan@kanna-mac test % python test_cs_title.py
.
----------------------------------------------------------------------
Ran 1 test in 4.430s

OK
(venv) kannappannatarasan@kanna-mac test %


USAGE 2
------
python -m unittest test_cs_title.py 
'''

