from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from urllib.parse import unquote
import time
import csv
import re

csvFile = './remove_dbProxy.csv'

def fixDbproxy(itemIcon, driver):
    for item in itemIcon:
        item.click()
        time.sleep(3)
        try:
            itemURL = driver.find_element(By.NAME, 'url')

            targetWindow = driver.find_element(By.NAME, 'target')
            sel = Select(targetWindow)

            sel.select_by_value('2')

        except:
            itemURL = driver.find_element(By.NAME, 'book_url')

        pattern = r"https://dbproxy\.lasalle\.edu(?::\d+)?/login\?url="
        removeProxy = re.sub(pattern, "", itemURL.get_attribute('value'))

        


        print("Before URL: " + itemURL.get_attribute('value'))
        print("After URL: " + removeProxy + '\n')

        newRow = [itemURL.get_attribute('value'), removeProxy]
        with open(csvFile, mode='a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(newRow)

        itemURL.clear()
        itemURL.send_keys(removeProxy)
        

        proxySetting = driver.find_element(By.NAME, 'enable_proxy')
        driver.execute_script("arguments[0].value='1';", proxySetting)

        time.sleep(2)
        saveBtn = driver.find_element(By.ID, 's-lib-alert-btn-first')
        saveBtn.click()

        break


def fixOpenA(itemIcon, driver):
    for item in itemIcon:
        item.click()
        time.sleep(3)
        try:
            itemURL = driver.find_element(By.NAME, 'url')

            targetWindow = driver.find_element(By.NAME, 'target')
            sel = Select(targetWindow)

            sel.select_by_value('2')

        except:
            itemURL = driver.find_element(By.NAME, 'book_url')

        pattern = r"https://go\.openathens\.net/redirector/lasalle\.edu\?url="

        removeProxy = re.sub(pattern, "", itemURL.get_attribute('value'))
        removeProxy = unquote(removeProxy)

        


        print("Before URL: " + itemURL.get_attribute('value'))
        print("After URL: " + removeProxy + '\n')

        newRow = [itemURL.get_attribute('value'), removeProxy]
        with open(csvFile, mode='a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(newRow)

        itemURL.clear()
        itemURL.send_keys(removeProxy)
        

        proxySetting = driver.find_element(By.NAME, 'enable_proxy')
        driver.execute_script("arguments[0].value='1';", proxySetting)

        time.sleep(2)
        saveBtn = driver.find_element(By.ID, 's-lib-alert-btn-first')
        saveBtn.click()

        break

def loadPage(driver):

    driver.get('https://lasalle.libapps.com/libguides/assets.php')

    email = driver.find_element(By.NAME, 's-libapps-email')
    password = driver.find_element(By.NAME, 's-libapps-password')

    email.clear()
    password.clear()
    email.send_keys('***********')
    password.send_keys('***********')

    signIn = driver.find_element(By.ID, 's-libapps-login-button')
    signIn.click()

    time.sleep(5)

    filter = driver.find_element(By.NAME,'assets__filter__url')

    filter.clear()

    filter.send_keys('openathens')

    filter.send_keys(Keys.RETURN)

    time.sleep(3)



if __name__ == '__main__':
    dPath = webdriver.EdgeService(executable_path= "PATH" + "/msedgedriver.exe")
    driver = webdriver.Edge(service=dPath)

    loadPage(driver)
    while(1):
        try:
            itemIcon = driver.find_elements(By.CLASS_NAME,'s-lg-bold')
            fixOpenA(itemIcon, driver)
            time.sleep(2)

        except Exception as e:
            print("There are no more links")
            driver.quit()
            break
