Rest Api: Text Justify

.../api/token

Post request: body= {email: exemple@xxxx.com}
response: {Token : youToken} expire in one hour

..../api/justify

Post request: header={Authorization: Bearer youToken}, bodyRaw(text/plain)=you Text 
response: your justified Text with 80 char a line.
