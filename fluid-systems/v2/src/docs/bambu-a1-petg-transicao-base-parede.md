# Bambu Lab A1 + PETG - Marca na transicao da base para a parede

## Nome mais provavel do problema

Pelo sintoma descrito, o nome mais provavel e:

- `step-change layer lines`
- ou `linha de transicao da base para a parede`
- tambem muito associada ao efeito visto no `Benchy hull line`

Nao costuma ser `elephant foot`, porque elephant foot aparece nas primeiras camadas junto da mesa.
Nao costuma ser `seam` quando a marca forma um anel horizontal ao redor da peca inteira.

Se a marca for um anel horizontal em toda a peca, o mais provavel e ser essa transicao de geometria/fluxo.
Se for uma cicatriz vertical em um lado so, ai o problema principal passa a ser `seam`.

## Causa provavel

Essa marca costuma aparecer quando a impressao passa de uma regiao de base mais macica para uma parede lateral mais fina. Nessa mudanca, variam:

- fluxo necessario
- pressao no bico
- velocidade efetiva
- resfriamento
- brilho superficial do PETG

O PETG evidencia bastante esse tipo de transicao.

## Antes de testar

Para nao se perder:

1. Duplicar o preset de `Filament` e o preset de `Process`.
2. Usar sempre a mesma peca, mesma orientacao e mesma altura de camada.
3. Mudar uma configuracao por vez.
4. Se alguma opcao nao aparecer, ativar `Developer mode` em `Ctrl+P > Preferences > Developer mode`.

## Ordem de testes no Bambu Studio

Fazer exatamente nesta ordem, um teste por vez.

### Teste 1 - Flow Dynamics

Local:

- `Calibration > Flow Dynamics > Auto-Calibration`

O que fazer:

- Rodar a calibracao com o mesmo PETG, mesmo bico e mesma mesa que voce usa normalmente.
- Salvar o resultado.
- Reimprimir a mesma peca sem mudar mais nada.

Motivo:

- Corrige a resposta de pressao/extrusao quando ha mudanca de velocidade e fluxo.

Observacao:

- Na A1, a wiki da Bambu indica suporte a `Auto-Calibration` para `Flow Dynamics`.

### Teste 2 - Flow Rate

Local:

- `Calibration > Flow Rate > Manual Calibration > Complete Calibration`

O que fazer:

- Rodar `Complete Calibration`.
- Salvar em um preset novo.
- Reimprimir a mesma peca.

Motivo:

- Se o PETG estiver levemente sobre-extrudando, essa linha de transicao tende a ficar mais aparente.

Observacao:

- Na documentacao publica da Bambu, `Flow Rate` no A1 nao e algo que eu trataria como automatico garantido. Para manter o procedimento seguro, usar `Manual Calibration`.

### Teste 3 - Max volumetric speed

Local:

- `Filament preset > Edit preset > Filament > Max volumetric speed`

O que mudar:

- Se estiver em `Generic PETG`, testar `10 mm3/s`.
- Se ja estiver em `10 mm3/s`, testar `8 mm3/s`.
- Se estiver em `PETG HF` ou algo perto de `16 mm3/s`, testar `14 mm3/s` primeiro.
- Se ainda marcar, depois testar `12 mm3/s`.

Motivo:

- PETG sofre mais quando o hotend trabalha perto do limite de fluxo.
- Reduzir esse valor tende a deixar a extrusao mais estavel.

### Teste 4 - Outer wall speed

Local:

- `Process > Speed > Outer wall`

O que mudar:

- Primeiro teste: `40 mm/s`
- Segundo teste, se necessario: `30 mm/s`

Motivo:

- A parede externa costuma denunciar qualquer variacao de fluxo, temperatura e brilho.

### Teste 5 - Smooth speed discontinuity area

Local:

- `Process > Quality > Advanced > Smooth speed discontinuity area`
- `Process > Quality > Advanced > Smooth coefficient`

O que mudar:

- `Smooth speed discontinuity area = Enabled`
- `Smooth coefficient = 0.1`

Observacao importante:

- A documentacao da Bambu para PETG cita `0.1` como valor util em casos de defeito de superficie por mudanca de velocidade.
- Se sua versao nao aceitar decimal nesse campo, usar o menor valor permitido pela interface.

Motivo:

- Esse ajuste suaviza a transicao de velocidade em zonas onde o slicer mudaria o comportamento de forma brusca.

### Teste 6 - Smoothing Wall Speed Along Z

Local:

- `Process > Quality > Advanced > Smoothing Wall Speed Along Z`

O que mudar:

- `Enabled`

Motivo:

- Ajuda quando aparecem faixas horizontais de brilho ou de velocidade ao longo da altura da peca.

### Teste 7 - Temperatura do bico

Local:

- `Filament preset > Temperature > Nozzle`

O que mudar:

- Baixar `5 C`

Exemplos:

- `250 -> 245 C`
- `245 -> 240 C`

Motivo:

- PETG quente demais tende a sair mais "gordo", marcar mais brilho e destacar essa linha.

### Teste 8 - Wall loops

Local:

- `Process > Strength > Walls > Wall loops`

O que mudar:

- Subir `+1`
- Exemplo: `2 -> 3`

Motivo:

- Em algumas geometrias isso muda o caminho interno de extrusao e reduz o impacto visual da transicao.

### Teste 9 - Order of walls

Local:

- `Process > Quality > Advanced > Order of walls`

O que mudar:

- Testar `Inner wall / Outer wall / Inner wall`

Motivo:

- Segundo a documentacao da Bambu, esse modo pode reduzir a influencia de contracao e compressao interna sobre a parede externa.

Se piorar:

- Voltar para o padrao anterior.

## Sequencia curta recomendada

Se quiser o caminho mais objetivo, testar nesta ordem curta:

1. `Flow Dynamics`
2. `Flow Rate`
3. `Max volumetric speed`
4. `Outer wall`
5. `Smooth speed discontinuity area`
6. `Smoothing Wall Speed Along Z`
7. `Nozzle -5 C`

## Valores iniciais que valem tentar primeiro

Para A1 com bico `0.4 mm` e PETG comum:

- `Max volumetric speed = 10 mm3/s`
- `Outer wall = 40 mm/s`
- `Smooth speed discontinuity area = Enabled`
- `Smooth coefficient = 0.1` ou menor valor permitido
- `Nozzle = -5 C` em relacao ao valor atual

## Regra importante sobre recalibracao

Se voce mudar:

- `Max volumetric speed`
- ou `Nozzle temperature`

vale a pena rodar novamente:

- `Calibration > Flow Dynamics > Auto-Calibration`

Motivo:

- A propria Bambu orienta recalibrar `Flow Dynamics` quando temperatura de impressao ou `Max volumetric speed` mudam.

## O que da para fazer no FreeCAD

Nao corrige a causa fisica diretamente, mas pode reduzir muito a marca no modelo.

O que ajuda:

1. Adicionar `fillet` interno pequeno na juncao da base com a parede.
2. Se fizer sentido na geometria, usar `chamfer` ou uma transicao levemente inclinada.
3. Evitar mudanca brusca de base muito grossa para parede muito fina.
4. Fazer a espessura da parede em multiplos coerentes com a largura de extrusao.
5. Fazer a espessura da base em multiplos coerentes com a altura de camada.

Resumo pratico:

- Melhor caminho primeiro: ajustar slicer.
- Melhor caminho definitivo: ajustar slicer + melhorar a transicao no CAD.

## Como diferenciar de seam

Se aparecer:

- um anel horizontal ao redor da peca inteira: mais provavel ser a transicao base/parede
- uma linha vertical ou um pontinho sempre no mesmo lado: mais provavel ser `seam`

Se no futuro o problema parecer seam, os proximos parametros a investigar sao:

- `Process > Quality > Seam position`
- `Seam gap`
- `Scarf seam`

## Observacoes finais

- PETG absorve umidade e isso piora acabamento, stringing e consistencia de extrusao.
- Mesmo mexendo so no slicer, o resultado pode melhorar bastante.
- Nem sempre essa marca some 100%, mas normalmente da para reduzir bastante.