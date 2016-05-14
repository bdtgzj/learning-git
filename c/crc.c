#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// Compute the MODBUS RTU CRC
unsigned int ModRTU_CRC(unsigned char buf[], int len)
{
  unsigned int crc = 0xFFFF;

  for (int pos = 0; pos < len; pos++) {
    crc ^= (unsigned int)buf[pos];          // XOR byte into least sig. byte of crc
 
    for (int i = 8; i != 0; i--) {    // Loop over each bit
      if ((crc & 0x0001) != 0) {      // If the LSB is set
        crc >>= 1;                    // Shift right and XOR 0xA001
        crc ^= 0xA001;
      }
      else                            // Else LSB is not set
        crc >>= 1;                    // Just shift right
    }
  }
  // Note, this number has low and high bytes swapped, so use it accordingly (or swap bytes)
  return crc;
}

// Convert Hexadecimal to Decimal
unsigned long convertToDecimal(char hex[])
{
    char *hexString;
    int length = 0;
    const int base = 16; // Base of Hexadecimal Number
    unsigned long decimalNumber = 0;
    int i;
    // Find length of Hexadecimal Number
    for (hexString = hex; *hexString != '\0'; hexString++)
    {
        length++;
    }
    // Find Hexadecimal Number
    hexString = hex;
    for (i = 0; *hexString != '\0' && i < length; i++, hexString++)
    {
        // Compare *hexString with ASCII values
        if (*hexString >= 48 && *hexString <= 57)   // is *hexString Between 0-9
        {
            decimalNumber += (((int)(*hexString)) - 48) * pow(base, length - i - 1);
        }
        else if ((*hexString >= 65 && *hexString <= 70))   // is *hexString Between A-F
        {
            decimalNumber += (((int)(*hexString)) - 55) * pow(base, length - i - 1);
        }
        else if (*hexString >= 97 && *hexString <= 102)   // is *hexString Between a-f
        {
            decimalNumber += (((int)(*hexString)) - 87) * pow(base, length - i - 1);
        }
        else
        {
            printf(" Invalid Hexadecimal Number %c \n", *hexString);

            printf(" Press enter to continue... \n");
            fflush(stdin);
            getchar();
            return 0;
            exit(0);
        }
    }
    // printf("%lu\n", decimalNumber);
    return decimalNumber;
}

int main(int argc, char* argv[])
{
  unsigned char msg[argc-1];
  unsigned int crc;
  unsigned char* p = (unsigned char*)&crc;

  if (argc < 2)
  {
    printf("%s\n", "Syntax: crc <Hexadecimal message>");
    return 0;
  }

  for (int i = 0; i < argc-1; i++)
  {
    msg[i] = (unsigned char)convertToDecimal(argv[i+1]);
    // printf("%i\n", msg[i]);
  }
  // printf("%s\n", msg);

  crc = ModRTU_CRC(msg, argc-1);

  printf("crc is: %02X %02X\n", *p, *(p+1));

  return 0;
}