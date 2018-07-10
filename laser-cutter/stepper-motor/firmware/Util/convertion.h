#ifndef UTIL_CONVERTION_H
#define	UTIL_CONVERTION_H

union UInt16ConvertionUnion {
   unsigned int value;
   unsigned char bytes[2];
} UInt16Convertion;

union ULong32ConvertionUnion {
   unsigned long value;
   unsigned char bytes[4];
} ULong32Convertion;

#endif	/* UTIL_CONVERTION */