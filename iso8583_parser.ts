interface ISOField {
    id: string;
    length: number;
    value: string;
}

export function parseISO8583Message(message: string): Record<string, ISOField> {
    const isoMessage: Record<string, ISOField> = {};
    let position = 0;

    // Parse the Message Type Indicator (MTI)
    const mti: ISOField = {
        id: 'MTI',
        length: 4,
        value: message.substring(position, position + 4),
    };
    isoMessage['MTI'] = mti;
    position += 4;

    // Parse the primary bitmap
    const primaryBitmap: ISOField = {
        id: 'Primary Bitmap',
        length: 16,
        value: message.substring(position, position + 16),
    };
    isoMessage['Primary Bitmap'] = primaryBitmap;
    position += 16;

    // Parse the secondary bitmaps, if present
    let bitmap = primaryBitmap.value;
    while (bitmap.charAt(0) === '1') {
        const secondaryBitmap: ISOField = {
            id: `Secondary Bitmap ${position / 16}`,
            length: 16,
            value: message.substring(position, position + 16),
        };
        isoMessage[secondaryBitmap.id] = secondaryBitmap;
        position += 16;

        bitmap = bitmap.substr(1); // Remove the first bit from the bitmap
    }

    // Parse the data elements
    while (position < message.length) {
        const fieldId: string = message.substring(position, position + 2);
        position += 2;

        const length: number = parseInt(message.substring(position, position + 2), 10);
        position += 2;

        const value: string = message.substring(position, position + length);
        position += length;

        const field: ISOField = {
            id: fieldId,
            length,
            value,
        };
        isoMessage[fieldId] = field;
    }

    return isoMessage;
}

// Test ISO 8583 message
const isoMessage = 'ISO0150000500200B238800128A180180000000000400000000000000000000081000000000000000000000000012345678901234567890123456789';

// Parse the ISO 8583 message into JSON format
const parsedMessage = parseISO8583Message(isoMessage);

// Print the parsed message as JSON
console.log(JSON.stringify(parsedMessage, null, 2));