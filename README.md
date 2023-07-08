# ISO8583 Server and Parser

This code shows you how to run an ISO8583 server using Typescript.

## How it works
The way this server works is it opens a socket port that listens for incoming ISO8583 messages. If you're going to deploy this, make sure to run this as a server (VM) or a container.

## Prerequisites
Must have Typescript and `ts-node` installed

## How to run the Server
Run `iso8583_server.ts`

Command: 
`ts-node iso8583_server.ts`

Expected Response:
```
ISO 8583 server started and listening on port 1234
```

At this point, the ISO8583 server is waiting for connections.

## How to send test data to Server
Run `iso8583_sender.ts`

Command:
`ts-node iso8583_sender.ts`

Expected Response:
```
Connected to the server
Received message from server: ISO8583_RESPONSE
Connection closed
```

You can edit the response in the `iso8583_server.ts`

## How to test the parser
Run `iso8583_parser.ts`

Command:
`ts-node iso8583_parser.ts`

Expected Response:
```
{
  "34": {
    "id": "34",
    "length": 56,
    "value": "78901234567890123456789"
  },
  "MTI": {
    "id": "MTI",
    "length": 4,
    "value": "ISO0"
  },
  "Primary Bitmap": {
    "id": "Primary Bitmap",
    "length": 16,
    "value": "150000500200B238"
  },
  "Secondary Bitmap 1.25": {
    "id": "Secondary Bitmap 1.25",
    "length": 16,
    "value": "800128A180180000"
  },
  "00": {
    "id": "00",
    "length": 1,
    "value": "2"
  }
}
```