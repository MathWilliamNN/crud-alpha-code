
CREATE TABLE `dadoscadastrados` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(255) NOT NULL,
  `dataNascimento` varchar(10) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `profissao` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `celular` varchar(20) NOT NULL,
  `whatsapp` varchar(5) NOT NULL,
  `notificacoesEmail` varchar(5) NOT NULL,
  `notificacoesSms` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`