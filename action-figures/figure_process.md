# Processo Macro para Criacao de Figures

Documento mestre do pipeline. Serve como porta de entrada para orientar a execucao da IA e apontar para os documentos detalhados de cada fase.

## Objetivo

Transformar um modelo de personagem em um conjunto de pecas separadas por cor, imprimiveis em 3D, montaveis e validadas para producao.

## Fluxo Sequencial

### 1. Definicao do projeto

Definir personagem, versao visual, escala, cores principais e estrategia inicial de montagem.

Documento de referencia:
- [01_definition.md](01_definition.md)

Saidas:
- personagem escolhido
- modelo base aprovado
- escala final
- cores principais
- decisao inicial de montagem

### 2. Preparacao do modelo no Blender

Importar, organizar e limpar o modelo base.

Saida:
- arquivo base pronto para pose

### 3. Pose final no Blender

Definir a pose definitiva e aprovar a silhueta geral.

Saida:
- modelo posed aprovado

### 4. Conversao para malha imprimivel

Aplicar pose, limpar geometria e corrigir problemas de malha.

Saida:
- malha solida e imprimivel

### 5. Separacao por cor

Definir quais regioes viram pecas independentes para impressao sem AMS.

Saida:
- mapa de pecas por cor

### 6. Separacao por impressao

Dividir o modelo em blocos que caibam bem na impressora e reduzam risco de falha.

Saida:
- mapa de pecas por impressao

### 7. Cortes tecnicos e encaixes no FreeCAD

Criar cortes, pinos, furos e interfaces de montagem.

Saida:
- pecas tecnicas prontas para teste

### 8. Validacao estrutural e visual

Revisar espessuras, fragilidade, emendas e viabilidade de montagem.

Saida:
- revisao final aprovada antes da exportacao

### 9. Exportacao dos arquivos

Exportar cada peca final com padrao de nomes consistente.

Saida:
- STLs ou 3MFs finais

### 10. Fatiamento para a Bambu Lab A1

Definir orientacao, suportes e parametros de impressao por peca.

Saida:
- arquivos prontos para impressao

### 11. Prototipagem e calibracao

Testar encaixes, tolerancias e pecas criticas.

Saida:
- tolerancias validadas

### 12. Producao final

Imprimir o conjunto completo.

Saida:
- kit fisico completo

### 13. Pos-processo e montagem

Limpar, ajustar, colar e finalizar a figure.

Saida:
- figure final montada

## Papel de Cada Ferramenta

### Blender

- preparacao do modelo
- pose
- limpeza organica de malha
- separacao inicial de partes

### FreeCAD

- cortes tecnicos
- encaixes
- tolerancias
- refinamento mecanico

### Bambu Lab A1

- impressao FDM
- validacao pratica das pecas
- producao final

## Gates do Processo

1. Pose aprovada.
2. Malha imprimivel aprovada.
3. Separacao por cor e impressao aprovada.
4. Encaixes validados.
5. Prototipo parcial validado antes da producao completa.

## Documentos da Pipeline

1. [01_definition.md](01_definition.md)
2. 02_preparation.md
3. 03_pose.md
4. 04_printable_mesh.md
5. 05_color_split.md
6. 06_print_split.md
7. 07_connectors_freecad.md
8. 08_export.md
9. 09_slicing_bambu_a1.md
10. 10_prototyping.md
11. 11_final_production_and_assembly.md