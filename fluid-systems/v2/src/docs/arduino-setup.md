# Arduino no VS Code

## Fluxo usado

- extensao Arduino Community Edition
- extensao C/C++
- `arduino-cli` no `PATH`
- core `arduino:avr`
- placa `Arduino Nano`
- configuracao `ATmega328P (Old Bootloader)`
- upload serial pela porta COM

## Instalacao no PC

Instale:
- VS Code
- `vscode-arduino.vscode-arduino-community`
- `ms-vscode.cpptools`
- driver `CH341SER`

Confirme o CLI:

```bash
arduino-cli version
```

Instale o core:

```bash
arduino-cli core update-index
arduino-cli core install arduino:avr
```

## Inicio do projeto

1. Crie a pasta do firmware.
2. Crie o arquivo principal `.ino`.
3. Abra a workspace no VS Code.
4. Rode `Arduino: Initialize`.
5. Rode `Arduino: Change Board Type`.
6. Escolha `Arduino Nano`.
7. Escolha `ATmega328P (Old Bootloader)`.
8. Rode `Arduino: Select Serial Port`.
9. Escolha a porta da placa.

## Configuracao do workspace

Arquivo `.vscode/arduino.json`:

```json
{
  "configuration": "cpu=atmega328old",
  "board": "arduino:avr:nano",
  "sketch": "firmware\\main.ino",
  "port": "COM5",
  "output": "..\\arduino-build\\main"
}
```

Arquivo `.vscode/settings.json`:

```json
{
  "arduino.useArduinoCli": true
}
```

## Build

No VS Code:

```text
Arduino: Verify
```

No terminal, na pasta do firmware:

```bash
arduino-cli compile --fqbn arduino:avr:nano:cpu=atmega328old .
```

## Flash

No VS Code:

```text
Arduino: Upload
```

No terminal, na pasta do firmware:

```bash
arduino-cli upload -p COM5 --fqbn arduino:avr:nano:cpu=atmega328old .
```

## Monitor serial

```text
Arduino: Open Serial Monitor
```

## Ponto importante

Nao grave motor direto no pino do Arduino. Use driver de potencia e fonte do motor com `GND` comum.