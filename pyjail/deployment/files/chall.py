def main():
    print("Hi! Welcome to pyjail!")
    print(open(__file__).read())
    print("RUN")
    text = input('>>> ')
    for keyword in ['eval', 'exec', 'import', 'open', 'os', 'read', 'system', 'write','process','socket','help']:
        if keyword in text.lower():
            print("No!!!")
            return;
    else:
        exec(text)
if __name__ == "__main__":
    main()