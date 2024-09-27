import requests
import csv
import os

os.chdir(os.path.dirname(os.path.realpath(__file__)))


def check_page(url, timeout, check):
    httpR = 'OK'
    headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'application/json'
    }
    try:
        response = requests.get(url, headers=headers, timeout=timeout)
        print(f"REG_Response: {response.status_code}")
        if 400 <= response.status_code < 500:
            print('Link 400!')
            httpR = '400'
        
        elif 300 <= response.status_code < 400:
            print('Link 300!')
            httpR = '300'
        
        elif 500 <= response.status_code < 600:
            print('Link 500!')
            httpR = '500'
        
        
        with open('./data/' + httpR + 'Links.csv', mode='a', newline='') as file:
            writer = csv.writer(file)
            row = [url,'']
            writer.writerow(row)   


    except requests.Timeout as e:
        print(f"Timed Out: {e}")
        if check == 0:
            check_page(url, (5,5), 1)
        else:
            print(f"Gave up on: {url}")
            with open('./data/NoPageLinks.csv', mode='a', newline='') as file:
                writer = csv.writer(file)
                writer.writerow([url])   

    except requests.HTTPError as e:
        print(f"HTTP ERROR: {e}")
        with open('./data/NoPageLinks.csv', mode='a', newline='') as file:
                writer = csv.writer(file)
                writer.writerow([url,''])  

    except requests.RequestException as e:
        print(f"Other Error: {e}")
        with open('./data/NoPageLinks.csv', mode='a', newline='') as file:
                writer = csv.writer(file)
                writer.writerow([url,''])    

    

if __name__ == '__main__':
    csvFile = './data/Array.csv'

    with open(csvFile, 'r', newline='', encoding='utf-8') as file:
        r = csv.reader(file)
        header = next(r)

        for line in r:
            if str(line[5]) != '0':
                check_page(line[3], (2,2), 0)
            else:
                with open('./data/NoMapping.csv', mode='a', newline='') as file:
                    writer = csv.writer(file)
                    writer.writerow([line[3]])  
                print('No mapping for: ', line[3])
