from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import WebDriverException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.edge.options import Options

from urllib.parse import quote
import time
import csv
import os

os.chdir(os.path.dirname(os.path.realpath(__file__)))

dPath = webdriver.EdgeService(executable_path="./edgedriver_win64/msedgedriver.exe")
driver = webdriver     
options = Options()
options.add_argument("-inprivate")

def loadPage(driver, url, check):

    if check == 0:
        time.sleep(0.5)
        driver.get('https://lasalle.libapps.com/libguides/linkchecker.php')

        email = driver.find_element(By.NAME, 's-libapps-email')
        password = driver.find_element(By.NAME, 's-libapps-password')

        email.clear()
        password.clear()
        email.send_keys('***************')
        password.send_keys('***************')

        signIn = driver.find_element(By.ID, 's-libapps-login-button')
        signIn.click()

    filter = driver.find_element(By.ID,'s-lib-col-filter-5')

    filter.clear()

    filter.send_keys(url)

    filter.send_keys(Keys.RETURN)

    time.sleep(1)

    try:
        itemIcon = driver.find_elements(By.CLASS_NAME,'s-lg-bold')
        if len(itemIcon) < 3:
            raise Exception
        itemIcon[2].click()
        time.sleep(1)
        targetWindow = driver.find_element(By.NAME, 'target')
        sel = Select(targetWindow)

        sel.select_by_value('2')
    except Exception as e:
        print("No Element on page! ", e)


    try: 
        done = WebDriverWait(driver, 600).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'dataTables_empty'))
        )

    except TimeoutException as e:
        print("Past 10mins", e)
        quit()

    except WebDriverException as e:
        print("Err", e)
        quit()


def getLink(link, check):
    try:
        openAthenLink = 'https://go.openathens.net/redirector/lasalle.edu?url=' + link
        encodeLink = 'https://go.openathens.net/redirector/lasalle.edu?url=' + quote(link, safe='')

        if check == 0:
            driver.implicitly_wait(10)
            driver.maximize_window()


            driver.get(link)
            time.sleep(1)

            driver.execute_script(f"window.open('{openAthenLink}', '_blank');")
            time.sleep(0.5)
            driver.switch_to.window(driver.window_handles[1])

            driver.execute_script(f"window.open('{encodeLink}', '_blank');")
            time.sleep(0.5)
            driver.switch_to.window(driver.window_handles[2])

            driver.execute_script("window.open('', '_blank');")
            time.sleep(0.5)
            driver.switch_to.window(driver.window_handles[3])
            time.sleep(1)

            loadPage(driver, link, check)

        else:
            driver.switch_to.window(driver.window_handles[0])
            time.sleep(0.5)
            driver.get(link)
            time.sleep(1)

            driver.switch_to.window(driver.window_handles[1])
            driver.get(openAthenLink)
            time.sleep(0.5)
            

            driver.switch_to.window(driver.window_handles[2])
            driver.get(encodeLink)
            time.sleep(0.5)

            driver.switch_to.window(driver.window_handles[3])
            time.sleep(1)

            loadPage(driver, link, check)


    except WebDriverException as e:
        print("Timed out", e)

        driver.execute_script("window.open('', '_blank');")
        time.sleep(0.5)
        driver.switch_to.window(driver.window_handles[3])
        time.sleep(1)
        loadPage(driver, link, check)

    except Exception as e:
        print("ErrR", e)
        driver.quit()

def handleCSV(csvFile):

    try:
        with open(csvFile, 'r', newline='', encoding='utf-8') as file:
            reader = csv.reader(file)
            header = next(reader)
            rows = list(reader)  

        if 'Processed' not in header:
            header.append('Processed')
            for row in rows:
                row.append('')

        processed_idx = header.index('Processed')

        global driver
        driver = webdriver.Edge(service=dPath, options=options)
        j = 0
        for i, line in enumerate(rows):
            if line[processed_idx] != 'Yes':  
                print(line[0])
                getLink(line[0], j)
                j += 1
                rows[i][processed_idx] = 'Yes'  

                with open(csvFile, 'w', newline='', encoding='utf-8') as file:
                    writer = csv.writer(file)
                    writer.writerow(header)
                    writer.writerows(rows)

    except FileNotFoundError:
        print('No file found\n')
        csvFile = input('Enter CSV File name: ')
        csvFile = "./data/" + csvFile + ".csv"
        handleCSV(csvFile)

    driver.quit()
    print("End of Links!")


if __name__ == '__main__':

    csvFile = input('Enter CSV File name: ')
    csvFile = "./data/" + csvFile + ".csv"
    handleCSV(csvFile)
    

        
