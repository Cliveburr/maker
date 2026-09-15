# 01 - Definicao do Projeto

Este documento define a Fase 1 do pipeline da figure: selecionar o character, definir as restricoes do projeto, identificar fontes adequadas de model e estabelecer os criterios de aceitacao do base model.

O foco atual e adquirir ready-made models que ja estejam disponiveis para download. O workflow de extraction fica intencionalmente como tarefa futura.

## Objetivo da Fase

Selecionar um character e garantir um base model bom o suficiente para entrar na etapa de preparacao no Blender sem retrabalho desnecessario.

## Escopo

Esta fase cobre:
- selecao do character
- intencao do projeto e quality target
- source discovery
- avaliacao do base model
- filtro legal e tecnico inicial

Esta fase nao cobre:
- posing
- cleanup de printable mesh
- part splitting
- connector design
- configuracao de slicer
- procedimento de extraction

## Saida Principal

Ao final desta fase, o projeto deve ter:
- um character selecionado
- uma source aprovada para o base model
- um working file set baixado
- um scale target definido
- uma premissa inicial de color breakdown
- uma decisao de go or no-go para o model escolhido

## Criterios para Selecao do Character

O character deve ser escolhido com base tanto no apelo visual quanto na viabilidade de producao.

Criterios recomendados:
- silhouette forte, que funcione bem como figure fisica
- costume design com color blocks claros
- accessories que possam ser separados com limpeza
- baixa dependencia de efeitos transparentes ou simulados
- anatomia e detalhes de outfit que continuem bons quando convertidos para geometria real
- potencial de pose que funcione bem como peca estatica de display

Ordem pratica de preferencia:
1. Characters com roupas em camadas e limites bem definidos entre materiais.
2. Characters com hair, armor, props ou partes de costume que possam virar pecas impressas independentes.
3. Characters cujo visual iconico nao dependa de particle effects, cloth simulation ou detalhes muito finos e suspensos.

## Tipos de Source Recomendados

Para este projeto, a estrategia preferencial e começar por downloadable models ja disponiveis, em vez de depender de extraction.

Ordem de preferencia das sources:
1. Licensed marketplaces com rigged models para download.
2. Lojas de artistas com usage terms claros.
3. Uploads de comunidade com permissao explicita de download e licensing legivel.
4. Sources de modding apenas quando as permissoes forem claras e o asset puder ser usado legalmente para o objetivo pretendido.

## Lista de Sources para Models

Estes sao bons lugares para procurar character models, rigged assets ou referencias prontas para figure.

### Licensed and Commercial Sources

- Sketchfab: https://sketchfab.com
- CGTrader: https://www.cgtrader.com
- TurboSquid: https://www.turbosquid.com
- RenderHub: https://www.renderhub.com
- ArtStation Marketplace: https://www.artstation.com/marketplace
- Gumroad: https://gumroad.com
- BOOTH: https://booth.pm

### General 3D Libraries and Creator Ecosystems

- BlenderKit: https://www.blenderkit.com
- Mixamo: https://www.mixamo.com

### Modding and Community Ecosystems

- Nexus Mods: https://www.nexusmods.com

Use sources de comunidade e modding somente apos verificar:
- quem detem os direitos do character e do model original
- se download e reuse sao realmente permitidos
- se o asset e fan-made, extracted, converted ou oficialmente distribuido
- se personal printing e aceitavel pelos termos da source

## Regra de Legal Screening

Nem todo game model disponivel para download deve ser tratado como seguro para uso.

Antes de aprovar uma source, verificar:
- license ou usage statement
- exigencias de attribution
- se o model e fan art original, oficialmente publicado ou derivado de game assets protegidos
- se personal use e permitido
- se commercial use e proibido

Neste projeto, se o status legal estiver incerto, o model deve ser marcado como pending e nao deve ser considerado aprovado.

## Criterios de Aceitacao do Base Model

O model nao precisa ser perfeito, mas precisa ser estruturalmente util para o pipeline.

Criterios minimos de aceitacao:
- a identidade visual do character esta correta
- o outfit principal e os accessories estao presentes
- o model pode ser importado no Blender
- o scale pode ser normalizado sem problemas
- a mesh esta completa o suficiente para suportar cleanup
- as formas principais existem em geometria real, e nao apenas como ilusao de texture

Criterios fortemente desejados:
- rigged character com armature utilizavel
- objects separados ou material groups para hair, body, clothing, armor e props
- neutral pose, A-pose, T-pose ou qualquer pose que ainda possa ser editada com seguranca
- orientation e naming consistentes
- textures inclusas, mesmo que nao guiem diretamente o print final
- full body model, incluindo regioes ocultas que possam ficar expostas durante posing ou cutting

Red flags:
- limbs ausentes, back faces ausentes ou secoes quebradas
- dependencia extrema de alpha cards para hair, bordas de cloth ou ornamentos
- detalhes existentes apenas em normal maps ou textures pintadas
- non-rigged model quando a pose exigir mudancas significativas
- geometria unificada de forma que dificulte mais do que o necessario a color separation
- corrupcao severa de topologia ou instabilidade na importacao

## Como Deve Ser um Good Model

Um bom candidate model para este workflow deve se comportar mais como um production asset do que como um screenshot asset.

O model ideal deve ter:
- skeleton utilizavel ou ao menos uma estrutura amigavel para pose
- volume geometrico suficiente para preservar a forma real do costume
- componentes separaveis para as principais regioes de cor
- material assignment legivel, ajudando a identificar os limites entre partes
- geometry density concentrada em areas visiveis como face, hair, hands, pontos focais do costume e props

O model nao precisa ter:
- animation topology perfeita
- UV layout de nivel studio
- precisao de materiais physically based
- compatibilidade com game-engine apos a importacao

O model precisa ter:
- verdade geometrica suficiente para virar um objeto fisico
- editabilidade suficiente para suportar pose, cleanup, splitting e connector design

## File Formats Recomendados

File formats preferidos para import:
- FBX
- GLB ou GLTF
- OBJ com textures

Potencialmente utilizaveis, dependendo da source:
- DAE
- PMX
- XPS ou outros mesh formats que exijam conversao antes do cleanup no Blender

Regra preferencial:
- escolher a source que preserve rig, hierarchy e part separation com o menor esforco de conversao

## Checklist da Definicao do Projeto

Antes de concluir a Fase 1, confirmar todos os itens abaixo:

- target character selecionado
- target costume ou versao visual do character selecionada
- target scale definido
- target print style definido como assembly por cor sem AMS
- source shortlist criada
- candidate model baixado
- status de license revisado
- viabilidade de import no Blender confirmada
- presenca de rig verificada
- qualidade da part separation verificada
- decisao de go or no-go registrada

## TODO - Extraction

Extraction esta fora do escopo da fase atual, mas deve ser documentada depois em um arquivo dedicado.

Itens futuros de TODO:
- definir a politica legal para extracted assets
- definir quais game platforms e file formats entram no escopo
- definir a toolchain para acesso a arquivos, archive access e model conversion
- definir como preservar rig, textures e object hierarchy
- definir um validation checklist para extracted models antes da importacao no Blender
- definir regras de file naming e arquivamento para assets recuperados

## Regra de Decisao para Este Projeto

Por enquanto, o projeto deve priorizar ready-made models que ja estejam disponiveis para download e que sejam estruturalmente usaveis.

Extraction so deve entrar no workflow depois que o caminho de sourcing com models prontos estiver esgotado e depois que seus limites legais e tecnicos estiverem documentados corretamente.