#!/bin/python
# This is for python 2.7

# Thank you SO user Philippe
# http://stackoverflow.com/a/5273870

import sys
import BaseHTTPServer
import SimpleHTTPServer

PORT_NUMBER = sys.argv[1] if len(sys.argv) > 1 else 8000

# On Windows, this is slow AF.
def not_stupid_address_string(self):
    host, port = self.client_address[:2]
    return '%s (no getfqdn)' % host #used to call: socket.getfqdn(host)

SimpleHTTPServer.address_string = not_stupid_address_string
server_class = BaseHTTPServer.HTTPServer
httpd = server_class(('', PORT_NUMBER), SimpleHTTPServer.SimpleHTTPRequestHandler)
print 'Starting server on localhost with port: %s' % PORT_NUMBER
httpd.serve_forever()
