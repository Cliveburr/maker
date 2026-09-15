

## Cálculo de Compartimentos para Resistores (Bambu Lab A1)

### Dimensões do Compartimento (Slot)
- Largura: 65 mm
- Profundidade: 20 mm
- Altura: 15 mm

### Espessuras Utilizadas
- Divisórias internas: **3 mm**
- Paredes externas: **4 mm**
- Base: **4 mm**

### Fórmulas
Para n compartimentos na largura (W):
W_total = n × largura + (n-1) × divisória + 2 × parede_externa

Para m compartimentos na profundidade (D):
D_total = m × profundidade + (m-1) × divisória + 2 × parede_externa

### Cálculo na Largura (máx. 250 mm)
W_total = n × 65 + (n-1) × 3 + 2 × 4 ≤ 250
W_total = n × 65 + (n-1) × 3 + 8
W_total = n × 65 + 3n - 3 + 8
W_total = 68n + 5 ≤ 250
68n ≤ 245
n ≤ 245 / 68 ≈ 3,6
**=> Cabem 3 compartimentos na largura**

### Cálculo na Profundidade (máx. 250 mm)
D_total = m × 20 + (m-1) × 3 + 2 × 4 ≤ 250
D_total = m × 20 + (m-1) × 3 + 8
D_total = m × 20 + 3m - 3 + 8
D_total = 23m + 5 ≤ 250
23m ≤ 245
m ≤ 245 / 23 ≈ 10,65
**=> Cabem 10 compartimentos na profundidade**

### Resultado Final
- **Total de compartimentos por bandeja:** 3 (largura) × 10 (profundidade) = **30 compartimentos**
- **Dimensão final da base:**
  - Largura: 3 × 65 + 2 × 3 + 2 × 4 = 195 + 6 + 8 = **209 mm**
  - Profundidade: 10 × 20 + 9 × 3 + 2 × 4 = 200 + 27 + 8 = **235 mm**
  - Altura: 15 mm (pode ser ajustada conforme necessidade)
---
## Série de Resistores Coberta

**Série E24** (valores comerciais mais comuns, tolerância 5%)

Valores por década: 1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1

Faixa coberta: 1 Ω até 1 MΩ (6 décadas)
- Total de valores: 24 × 6 = **144 slots necessários**

## Distribuição dos Resistores

- Cada bandeja: 3 fileiras (largura) × 10 slots (profundidade) = 30 slots
- Armário: 5 gavetas (bandejas)
- Total de slots: 5 × 30 = **150 slots**

### Distribuição Progressiva

1. Separe os resistores por década (ex: 1–9.1 Ω, 10–91 Ω, 100–910 Ω, 1k–9.1k Ω, 10k–91k Ω, 100k–910k Ω, 1M Ω)
2. Em cada década, distribua os 24 valores E24 nos slots, seguindo a ordem crescente
3. Preencha os slots das bandejas na ordem:
	- Gaveta 1: 1 Ω a 91 Ω (24 slots) + 6 slots para reservas ou valores especiais
	- Gaveta 2: 100 Ω a 910 Ω (24 slots) + 6 slots reservas
	- Gaveta 3: 1k Ω a 9.1k Ω (24 slots) + 6 slots reservas
	- Gaveta 4: 10k Ω a 91k Ω (24 slots) + 6 slots reservas
	- Gaveta 5: 100k Ω a 910k Ω (24 slots) + 6 slots reservas
4. Os slots reservas podem ser usados para valores não padronizados, resistores de potência, ou para duplicar valores mais usados

### Exemplo de Distribuição (Gaveta 1)

| Slot | Valor (Ω) |
|------|-----------|
| 1    | 1.0       |
| 2    | 1.1       |
| 3    | 1.2       |
| 4    | 1.3       |
| 5    | 1.5       |
| 6    | 1.6       |
| 7    | 1.8       |
| 8    | 2.0       |
| 9    | 2.2       |
| 10   | 2.4       |
| 11   | 2.7       |
| 12   | 3.0       |
| 13   | 3.3       |
| 14   | 3.6       |
| 15   | 3.9       |
| 16   | 4.3       |
| 17   | 4.7       |
| 18   | 5.1       |
| 19   | 5.6       |
| 20   | 6.2       |
| 21   | 6.8       |
| 22   | 7.5       |
| 23   | 8.2       |
| 24   | 9.1       |
| 25-30| Reservas  |

Repita a lógica para as demais gavetas, mudando apenas a ordem de grandeza dos valores.

### Resumo das Espessuras
- Divisórias internas: 3 mm
- Paredes externas: 4 mm

### Observações
- Os cálculos consideram tolerância mínima para encaixe. Se desejar folga maior, ajustar as divisórias.
- A altura pode ser aumentada para comportar mais resistores por compartimento.

---
**Esses valores garantem robustez e boa impressão para uso prático em impressora 3D.**
--- 
## Gavetas — Labels e distribuição sugerida (7 gavetas; 3 colunas × 10 slots)

Abaixo uma sugestão prática, sequencial e aproximada (E24 expandida por décadas). Cada gaveta tem 3 "fileiras" (colunas na largura) com 10 slots cada. Use as últimas 2–6 slots por gaveta como reservas quando indicado.

Gaveta 1 — "1 Ω a 16 Ω (E24)"
- Fileira 1: 1.0 Ω, 1.1 Ω, 1.2 Ω, 1.3 Ω, 1.5 Ω, 1.6 Ω, 1.8 Ω, 2.0 Ω, 2.2 Ω, 2.4 Ω
- Fileira 2: 2.7 Ω, 3.0 Ω, 3.3 Ω, 3.6 Ω, 3.9 Ω, 4.3 Ω, 4.7 Ω, 5.1 Ω, 5.6 Ω, 6.2 Ω
- Fileira 3: 6.8Ω, 7.5 Ω, 8.2 Ω, 9.1 Ω, 10 Ω, 11 Ω, 12 Ω, 13 Ω, 15 Ω, 16 Ω

Gaveta 2 — "18 Ω a 300 Ω"
- Fileira 1: 18 Ω, 20 Ω, 22 Ω, 24 Ω, 27 Ω, 30 Ω, 33 Ω, 36 Ω, 39 Ω, 43 Ω
- Fileira 2: 47 Ω, 51 Ω, 56 Ω, 62 Ω, 68 Ω, 75 Ω, 82 Ω, 91 Ω, 100 Ω, 110 Ω
- Fileira 3: 120 Ω, 130 Ω, 150 Ω, 160 Ω, 180 Ω, 200 Ω, 220 Ω, 240 Ω, 270 Ω, 300 Ω

Gaveta 3 — "330 Ω a 5.1 kΩ"
- Fileira 1: 330 Ω, 360 Ω, 390 Ω, 430 Ω, 470 Ω, 510 Ω, 560 Ω, 620 Ω, 680 Ω, 750 Ω
- Fileira 2: 820 Ω, 910 Ω, 1.0 kΩ, 1.1 kΩ, 1.2 kΩ, 1.3 kΩ, 1.5 kΩ, 1.6 kΩ, 1.8 kΩ, 2.0 kΩ
- Fileira 3: 2.2 kΩ, 2.4 kΩ, 2.7 kΩ, 3.0 kΩ, 3.3 kΩ, 3.6 kΩ, 3.9 kΩ, 4.3 kΩ, 4.7 kΩ, 5.1 kΩ

Gaveta 4 — "5.6 kΩ a 91 kΩ"
- Fileira 1: 5.6 kΩ, 6.2 kΩ, 6.8 kΩ, 7.5 kΩ, 8.2 kΩ, 9.1 kΩ, 10 kΩ, 11 kΩ, 12 kΩ, 13 kΩ
- Fileira 2: 15 kΩ, 16 kΩ, 18 kΩ, 20 kΩ, 22 kΩ, 24 kΩ, 27 kΩ, 30 kΩ, 33 kΩ, 36 kΩ
- Fileira 3: 39 kΩ, 43 kΩ, 47 kΩ, 51 kΩ, 56 kΩ, 62 kΩ, 68 kΩ, 75 kΩ, 82 kΩ, 91 kΩ

Gaveta 5 — "100 kΩ a 1.6 MΩ"
- Fileira 1: 100 kΩ, 110 kΩ, 120 kΩ, 130 kΩ, 150 kΩ, 160 kΩ, 180 kΩ, 200 kΩ, 220 kΩ, 240 kΩ
- Fileira 2: 270 kΩ, 300 kΩ, 330 kΩ, 360 kΩ, 390 kΩ, 430 kΩ, 470 kΩ, 510 kΩ, 560 kΩ, 620 kΩ
- Fileira 3: 680 kΩ, 750 kΩ, 820 kΩ, 910 kΩ, 1.0 MΩ, 1.1 MΩ, 1.2 MΩ, 1.3 MΩ, 1.5 MΩ, 1.6 MΩ

Gaveta 6 — "1.8 MΩ a 30 MΩ"
- Fileira 1: 1.8 MΩ, 2.0 MΩ, 2.2 MΩ, 2.4 MΩ, 2.7 MΩ, 3.0 MΩ, 3.3 MΩ, 3.6 MΩ, 3.9 MΩ, 4.3 MΩ
- Fileira 2: 4.7 MΩ, 5.1 MΩ, 5.6 MΩ, 6.2 MΩ, 6.8 MΩ, 7.5 MΩ, 8.2 MΩ, 9.1 MΩ, 10 MΩ, 11 MΩ
- Fileira 3: 12 MΩ, 13 MΩ, 15 MΩ, 16 MΩ, 18 MΩ, 20 MΩ, 22 MΩ, 24 MΩ, 27 MΩ, 30 MΩ

Gaveta 7 — "33 MΩ a reservas / especiais"
- Fileira 1: 33 MΩ, 36 MΩ, 39 MΩ, 43 MΩ, 47 MΩ, 51 MΩ, 56 MΩ, 62 MΩ, 68 MΩ, 75 MΩ
- Fileira 2: 82 MΩ, 91 MΩ, 100 MΩ, 110 MΩ, 120 MΩ, 130 MΩ, 150 MΩ, 160 MΩ, 180 MΩ, 200 MΩ
- Fileira 3: 220 MΩ, 240 MΩ, 270 MΩ, 300 MΩ, 330 MΩ, 360 MΩ, 390 MΩ, 430 MΩ, 470 MΩ, 510 MΩ

Observações:
- As listas usam a série E24 por décadas; os sufixos k/ M foram aplicados para legibilidade.
- Ajuste reservas nas últimas posições de cada gaveta para duplicar valores muito usados (1%, 5% ou potências), ou para resistores de potência, potenciómetros, fusíveis, etc.
- Se preferir cobertura menor (até 1 MΩ), descarte gavetas altas e use-as para categorias como: potências, tolerâncias, sensores, jumpers.

---
## Gavetas (rótulos) — 7 gavetas (3 colunas × 10 slots)

Organização sugerida para as 7 gavetas do nicho. Cada gaveta tem 3 colunas (largura) × 10 slots (profundidade) = 30 slots. A distribuição abaixo usa a série E24 por década (24 valores) e deixa 6 slots como reservas/duplicatas/valores especiais. As colunas são preenchidas sequencialmente:
- Coluna 1: slots 1–10
- Coluna 2: slots 11–20
- Coluna 3: slots 21–24 (valores E24 restantes) + 6 reservas

### Rótulos frontais sugeridos
- **Gaveta 1:** 1 Ω → 9.1 Ω (E24)
- **Gaveta 2:** 10 Ω → 91 Ω (E24)
- **Gaveta 3:** 100 Ω → 910 Ω (E24)
- **Gaveta 4:** 1 kΩ → 9.1 kΩ (E24)
- **Gaveta 5:** 10 kΩ → 91 kΩ (E24)
- **Gaveta 6:** 100 kΩ → 910 kΩ (E24)
- **Gaveta 7:** 1 MΩ, reservas, duplicatas e resistores de potência

### Distribuição proposta (valores sequenciais — exemplo aproximado)

Base E24: 1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1

Gaveta 1 — 1 Ω a 9.1 Ω
- Coluna 1: 1.0 Ω, 1.1 Ω, 1.2 Ω, 1.3 Ω, 1.5 Ω, 1.6 Ω, 1.8 Ω, 2.0 Ω, 2.2 Ω, 2.4 Ω
- Coluna 2: 2.7 Ω, 3.0 Ω, 3.3 Ω, 3.6 Ω, 3.9 Ω, 4.3 Ω, 4.7 Ω, 5.1 Ω, 5.6 Ω, 6.2 Ω
- Coluna 3: 6.8 Ω, 7.5 Ω, 8.2 Ω, 9.1 Ω, Reserva, Reserva, Reserva, Reserva, Reserva, Reserva

Gaveta 2 — 10 Ω a 91 Ω
- Coluna 1: 10 Ω, 11 Ω, 12 Ω, 13 Ω, 15 Ω, 16 Ω, 18 Ω, 20 Ω, 22 Ω, 24 Ω
- Coluna 2: 27 Ω, 30 Ω, 33 Ω, 36 Ω, 39 Ω, 43 Ω, 47 Ω, 51 Ω, 56 Ω, 62 Ω
- Coluna 3: 68 Ω, 75 Ω, 82 Ω, 91 Ω, Reserva, Reserva, Reserva, Reserva, Reserva, Reserva

Gaveta 3 — 100 Ω a 910 Ω
- Coluna 1: 100 Ω, 110 Ω, 120 Ω, 130 Ω, 150 Ω, 160 Ω, 180 Ω, 200 Ω, 220 Ω, 240 Ω
- Coluna 2: 270 Ω, 300 Ω, 330 Ω, 360 Ω, 390 Ω, 430 Ω, 470 Ω, 510 Ω, 560 Ω, 620 Ω
- Coluna 3: 680 Ω, 750 Ω, 820 Ω, 910 Ω, Reserva, Reserva, Reserva, Reserva, Reserva, Reserva

Gaveta 4 — 1 kΩ a 9.1 kΩ
- Coluna 1: 1 kΩ, 1.1 kΩ, 1.2 kΩ, 1.3 kΩ, 1.5 kΩ, 1.6 kΩ, 1.8 kΩ, 2.0 kΩ, 2.2 kΩ, 2.4 kΩ
- Coluna 2: 2.7 kΩ, 3.0 kΩ, 3.3 kΩ, 3.6 kΩ, 3.9 kΩ, 4.3 kΩ, 4.7 kΩ, 5.1 kΩ, 5.6 kΩ, 6.2 kΩ
- Coluna 3: 6.8 kΩ, 7.5 kΩ, 8.2 kΩ, 9.1 kΩ, Reserva, Reserva, Reserva, Reserva, Reserva, Reserva

Gaveta 5 — 10 kΩ a 91 kΩ
- Coluna 1: 10 kΩ, 11 kΩ, 12 kΩ, 13 kΩ, 15 kΩ, 16 kΩ, 18 kΩ, 20 kΩ, 22 kΩ, 24 kΩ
- Coluna 2: 27 kΩ, 30 kΩ, 33 kΩ, 36 kΩ, 39 kΩ, 43 kΩ, 47 kΩ, 51 kΩ, 56 kΩ, 62 kΩ
- Coluna 3: 68 kΩ, 75 kΩ, 82 kΩ, 91 kΩ, Reserva, Reserva, Reserva, Reserva, Reserva, Reserva

Gaveta 6 — 100 kΩ a 910 kΩ
- Coluna 1: 100 kΩ, 110 kΩ, 120 kΩ, 130 kΩ, 150 kΩ, 160 kΩ, 180 kΩ, 200 kΩ, 220 kΩ, 240 kΩ
- Coluna 2: 270 kΩ, 300 kΩ, 330 kΩ, 360 kΩ, 390 kΩ, 430 kΩ, 470 kΩ, 510 kΩ, 560 kΩ, 620 kΩ
- Coluna 3: 680 kΩ, 750 kΩ, 820 kΩ, 910 kΩ, Reserva, Reserva, Reserva, Reserva, Reserva, Reserva

Gaveta 7 — Reservas, duplicatas e potência (exemplo)
- Rótulo: 1 MΩ e reservas / resistores de potência
- Coluna 1 (duplicatas/populares): 10 Ω, 22 Ω, 47 Ω, 100 Ω, 220 Ω, 470 Ω, 1 kΩ, 2.2 kΩ, 4.7 kΩ, 10 kΩ
- Coluna 2 (potência / especiais): 1 Ω 5 W, 2 Ω 5 W, 10 Ω 5 W, 22 Ω 5 W, 100 Ω 5 W, 220 Ω 5 W, 1 kΩ 5 W, 10 kΩ 5 W, Shunt 0.1 Ω, NTC
- Coluna 3 (SMD / misc / reservas): Kit SMD 0603, Kit SMD 0805, Kit SMD 1206, Trimmers / potenciômetros, Fusíveis, Jumpers, Reserva, Reserva, Reserva, Reserva

Observações:
- Ajuste as "Reservas" para valores mais usados no seu fluxo de trabalho.
- Se preferir preencher só com E24, troque as reservas por E24 das décadas superiores.

