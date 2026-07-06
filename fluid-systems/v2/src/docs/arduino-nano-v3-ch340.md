# Arduino Nano V3 com CH340

## Identificacao

- formato `Nano V3`
- microcontrolador `ATmega328P`
- USB serial `CH340G`
- conector `Mini-USB`
- logica `5 V`
- clock `16 MHz`

## Configuracao usada

- core `arduino:avr`
- board `arduino:avr:nano`
- configuracao `cpu=atmega328old`
- upload serial pela porta COM
- driver `CH341SER`

## Comandos usados

Instalacao do core:

```bash
arduino-cli core update-index
arduino-cli core install arduino:avr
```

Listagem da porta:

```bash
arduino-cli board list
```

Compilacao:

```bash
arduino-cli compile --fqbn arduino:avr:nano:cpu=atmega328old .
```

Gravacao:

```bash
arduino-cli upload -p COM5 --fqbn arduino:avr:nano:cpu=atmega328old .
```

## Alimentacao

- USB para gravacao e bancada
- `VIN` com `7 V` a `9 V` para alimentacao externa
- pino `5V` com fonte regulada de `5 V`
- `GND` comum entre Arduino e driver do motor

## Pinos uteis

- digitais `D0` a `D13`
- analogicos `A0` a `A7`
- PWM `D3`, `D5`, `D6`, `D9`, `D10`, `D11`
- serial `RX/TX` em `D0` e `D1`
- LED onboard em `D13`

## Limites praticos

- nao ligar motor direto no Arduino
- nao usar bateria retangular de `9 V` no motor
- nao puxar corrente alta pelo regulador da placa

## Resumo

Essa placa entra no projeto como `Arduino Nano` classico com `CH340`, `Old Bootloader` e upload serial normal.