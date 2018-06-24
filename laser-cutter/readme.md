
# Procedimento

1. Criar o arquivo do projeto
	- no formato SVG

2. Entrar com o arquivo do projeto na area de preparação
	- ajusta todas configurações possiveis
	- pequenos ajustes no traços
	- o sistema ira gerar um arquivo .MLC no formato binario com todos comandos
		em sequencia para que o dispositivo irá usar para efetuar o corte
		
3. Conectar ao dispositivo para efetuar o corte
	- detecção do status, Busy, Idle
	- fazer o carregamento do arquivo .MLC para o dispositivo
	- iniciar a execução do corte
	- detecção da etapa do corte
	- execução de comandos standalone

# Projetos

1. Dispositivo
	1.1 Hardware
		- projeto da estrutura em um modelador 3D
		- identificação da lista de peças
	1.2 Software
		- criação do software de controle em ESP
		- comunicação TCP

2. Interface
	2.1 Web
		- possibilidade de encapsular a web no Electron
		- area de preparação
			- upload do arquivo de projeto
			- tela de ajustes das configurações
			- tela para ajustes no desenho
			- geração do arquivo de comandos .MLC
		- area do dispositivo
			- broadcast na rede para localizar os dispositivos
			- conecção no dispositivo
			- detecção do status e etapa do corte
			- opção para carregar o arquivo .MLC
			- visualização do progresso dos comandos
			- opção de pausar, continuar
	2.2 Mobile
		- area do dispositivo
			< mesmas opções da web >
	2.3 Simulador
		- app no Electron
		- simula um dispositivo
		
		
# Peças

10 Metros de correia GT2 sincronizada 6mm de passo 2mm
R$50,00 - https://produto.mercadolivre.com.br/MLB-894184205-correia-gt2-6mm-impressora-3d-cnc-10-metros-_JM

6 Polias (tamanho a verificar ainda)
R$35,99 - https://produto.mercadolivre.com.br/MLB-798609422-correia-gt2mm-polias-furo-8mm-cnc-impressora-3d-_JM

3 Eixo Retificado Cromado de 8mm
R$12,00 - https://produto.mercadolivre.com.br/MLB-793861275-eixo-retificado-8mm-x-1000mm-h9-cnc-router-impressora-3d-aco-_JM

3 Pillow Block de 8mm
R$59,96 - https://produto.mercadolivre.com.br/MLB-832823724-kit-4-pillow-blocks-fechados-8mm-scs8uu-envio-imediato-_JM

3 Motor de passo nema 16
R$18,50 - https://produto.mercadolivre.com.br/MLB-984097549-motor-de-passo-nema-16-11-kgf-4-fios-12-volts-_JM

Modulo Laser

+/- 260





M 10.0,2660.0000000000005
L 3210.0,2660.0000000000005
L 3210.0,10.0
L 10.00000000000017,10.000000000000455
L 10.0,2660.0000000000005
M 2248.8801941042516,2022.3016024483977
L 978.8801941042519,2022.3016024483977
L 978.8801941042519,752.3016024483971
L 2248.8801941042516,752.3016024483968
L 2248.8801941042516,2022.3016024483977 