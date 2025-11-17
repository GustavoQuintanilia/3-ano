CREATE DATABASE goldentrip;
USE goldentrip;

-- CREATE TABLE
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    dataNascimento DATE NOT NULL
);

ALTER TABLE usuarios 
ADD COLUMN fotoPerfil VARCHAR(255);

select * from usuarios;

------------------------------------------------------
CREATE TABLE hoteis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    imagem VARCHAR(255),
    descricao VARCHAR(500),
    preco DECIMAL(10,2)
);


------------------------------------------------------
CREATE TABLE passagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    imagem VARCHAR(255),
    descricao VARCHAR(500),
    preco DECIMAL(10,2)
);


------------------------------------------------------
CREATE TABLE passeios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    imagem VARCHAR(255),
    descricao VARCHAR(500),
    preco DECIMAL(10,2)
);

------------------------------------------------------
CREATE TABLE pacotes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    imagem VARCHAR(255),
    descricao VARCHAR(500),
    preco DECIMAL(10,2)
);

------------------------------------------------------
CREATE TABLE reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_hotel INT,
    id_passagem INT,
    id_passeio INT,
    id_pacote INT,
    valor_total DECIMAL(10,2),
    data_viagem DATE NOT NULL,
    hora_viagem TIME,
    data_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_hotel) REFERENCES hoteis(id),
    FOREIGN KEY (id_passagem) REFERENCES passagens(id),
    FOREIGN KEY (id_passeio) REFERENCES passeios(id),
    FOREIGN KEY (id_pacote) REFERENCES pacotes(id)
);

select * from reservas;

-- INSERT
INSERT INTO hoteis (nome, imagem, descricao, preco) VALUES
('Hotel Marina Angra', 'https://q-xx.bstatic.com/xdata/images/hotel/max500/262483427.jpg?k=b5d29b4d3d668689f8c71913135bc5e9d38064d1d1ad64efa9289f9de2106a8d&o=', 'Conforto à beira-mar em Angra dos Reis.', 350.00),
('Pousada Noronha', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb', 'Hospedagem charmosa próxima às praias de Noronha.', 500.00),
('Resort Dunas de Genipabu', 'https://media.staticontent.com/media/pictures/c7969606-b83d-4ff0-a686-22dede640883/378x200?op=NONE&enlarge=false&gravity=ce_0_0&quality=80', 'Fique próximo das dunas e aproveite todo conforto do resort.', 450.00),
('Hotel Copacabana Palace', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/d8/0b/31/belmond-copacabana-palace.jpg?w=900&h=500&s=1', 'Luxo e vista para a famosa praia de Copacabana.', 1200.00),
('Pousada Pelourinho', 'https://images.unsplash.com/photo-1560347876-aeef00ee58a1', 'Acomodações típicas no coração histórico de Salvador.', 300.00),
('Resort Porto de Galinhas', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', 'Praia, piscinas naturais e conforto para toda a família.', 800.00),
('Hotel Cataratas', 'https://harpersbazaar.uol.com.br/wp-content/uploads/2019/03/belmond-hotel-das-cataratas-iguacu-01.jpg', 'Vista incrível para as Cataratas do Iguaçu.', 1000.00),
('Pousada Ilha da Magia', 'https://media-cdn.tripadvisor.com/media/photo-s/2d/ec/28/72/caption.jpg', 'Praias lindas e vida noturna animada em Florianópolis.', 400.00),
('Pousada Chapada Diamantina', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlzMj4zF_JdD_D9LF6eyTZxffrBfNd9I1myw&s', 'Hospedagem rústica próxima a trilhas e cachoeiras.', 350.00),
('Pousada Bonito', 'https://media-cdn.tripadvisor.com/media/photo-s/1b/c4/b8/6f/pousada-arte-da-natureza.jpg', 'Conforto e proximidade com rios cristalinos e grutas.', 450.00);

------------------------------------------------------
INSERT INTO passagens (nome, imagem, descricao, preco) VALUES
('Passagem para Angra dos Reis', 'https://cdn.sanity.io/images/nxpteyfv/goguides/c08719f0da903c9596771f6d0e8a5d13ffd449f3-1600x1066.jpg', 'Voe para Angra dos Reis e aproveite praias paradisíacas.', 350.00),
('Passagem para Fernando de Noronha', 'https://magazine.zarpo.com.br/wp-content/uploads/2021/10/baia-dos-porcos_zarpo-770x515.jpg', 'Explore as ilhas e mergulhe em águas cristalinas.', 500.00),
('Passagem para Dunas de Genipabu', 'https://www.viagenscinematograficas.com.br/wp-content/uploads/2023/03/Genipabu-Praia-Natal-RN-2.jpg', 'Aventure-se nas dunas com emoção garantida.', 400.00),
('Passagem para Rio de Janeiro', 'https://admin.passeiorio.com.br/wp-content/uploads/2024/10/o-que-fazer-no-rio-de-janeiro-RJ.jpg', 'Visite o Cristo Redentor e o Pão de Açúcar.', 450.00),
('Passagem para Salvador', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/43/ac/8f/pelourinho.jpg?w=600&h=400&s=1', 'Conheça o Pelourinho e praias famosas da Bahia.', 380.00),
('Passagem para Porto de Galinhas', 'https://www.jaraguaturismo.com/wp-content/uploads/2024/05/Porto-de-Galinhas.jpg', 'Relaxe nas piscinas naturais e praias incríveis.', 420.00),
('Passagem para Foz do Iguaçu', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/ed/a5/17/foz-do-iguacu.jpg?w=900&h=500&s=1', 'Encante-se com as famosas Cataratas do Iguaçu.', 550.00),
('Passagem para Florianópolis', 'https://magazine.zarpo.com.br/wp-content/uploads/2023/01/capa-o-que-fazer-florianopolis.jpg', 'Praias lindas e vida noturna animada.', 400.00),
('Passagem para Chapada Diamantina', 'https://static.planetaexo.com/trips/wp-content/uploads/2023/08/Chapada-Diamantina-Trip-7-days.jpg', 'Cachoeiras, trilhas e paisagens de tirar o fôlego.', 370.00),
('Passagem para Bonito', 'https://www.umviajante.com.br/wp-content/uploads/2018/04/gruta-lago-azul-bonito-ms-012.jpg', 'Mergulho em rios cristalinos e ecoturismo.', 390.00);

------------------------------------------------------
INSERT INTO passeios (nome, imagem, descricao, preco) VALUES
('Passeio de Barco em Angra dos Reis', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', 'Explore ilhas paradisíacas e mergulhe em águas cristalinas.', 300.00),
('Mergulho em Noronha', 'https://www.umviajante.com.br/wp-content/uploads/2024/08/passeio-barco-fernando-de-noronha.jpg', 'Explore corais e vida marinha em águas cristalinas.', 450.00),
('Passeio de Buggy nas Dunas de Genipabu', 'https://marazulreceptivo.com.br/wp-content/uploads/2024/10/Praia-de-Genipabu-scaled.jpg', 'Emoção e paisagens únicas nas areias do Rio Grande do Norte.', 350.00),
('Tour Cristo Redentor', 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/91/b7/58.jpg', 'Conheça o icônico monumento e suas vistas incríveis.', 400.00),
('Tour Histórico em Salvador', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQds6j8znHbdJXqZ-0XgHJAm4DQGebM2VXVUA&s', 'Passeio pelo Pelourinho e cultura baiana.', 320.00),
('Passeio de Mergulho em Porto de Galinhas', 'https://pgsocial-media.s3.sa-east-1.amazonaws.com/wp-content/uploads/2020/11/25050412/P_GOPR5748-scaled.jpg', 'Descubra a vida marinha nas piscinas naturais.', 380.00),
('Passeio às Cataratas do Iguaçu', 'https://cataratasdoiguacu.com.br/wp-content/uploads/2021/02/aneliseeee.jpeg', 'Emoção nas quedas d\'água mais famosas do Brasil.', 500.00),
('Passeio de Ilha em Florianópolis', 'https://floripaaventura.com/wp-content/uploads/2025/03/passeio-de-barco-para-ilha-do-campeche-com-saida-exclusiva-da-barra-da-lagoa-em-florianopolis-e-parada-na-ilha-com-tempo-livre.png', 'Praias paradisíacas e trilhas incríveis.', 400.00),
('Trilhas na Chapada Diamantina', 'https://static.planetaexo.com/wp-content/uploads/2022/11/what-to-do-in-chapada-diamantina-2.jpg', 'Explore cachoeiras e grutas inesquecíveis.', 350.00),
('Passeio de Flutuação em Bonito', 'https://bonitoecotour.com/file/passeio/6/flutuacao-na-barra-do-sucuri-bonito-ms_1.webp', 'Rios cristalinos e natureza exuberante esperam por você.', 360.00);

------------------------------------------------------
INSERT INTO pacotes (nome, imagem, descricao, preco) VALUES
('Pacote Angra dos Reis', 'https://magazine.zarpo.com.br/wp-content/uploads/2020/08/Mar-azul-e-ilhas-paradis%C3%ADacas-veja-o-que-fazer-em-Angra-dos-Reis.jpg', 
'Passagem para Angra dos Reis, 
Hotel Marina Angra, 
Passeio de barco em Angra dos Reis', 1000.00),

('Pacote Fernando de Noronha', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/49/45/85/fernando-de-noronha-memorial.jpg?w=900&h=500&s=1', 
'Passagem para Fernando de Noronha, 
Pousada Noronha, 
Mergulho em Noronha', 1450.00),

('Pacote Dunas de Genipabu', 'https://www.essemundoenosso.com.br/wp-content/uploads/2023/02/kamikase.jpg',
'Passagem para Dunas de Genipabu, 
Resort Dunas de Genipabu, 
Passeio de buggy nas dunas de Genipabu', 1200.00),

('Pacote para o Rio de Janeiro', 'https://www.zapimoveis.com.br/blog/wp-content/uploads/2024/06/bairros-do-rio-de-janeiro.jpg',
'Passagem para o Rio de Janeiro, 
Hotel Copacabana Palace, 
Tour Cristo Redentor', 2050.00),

('Pacote para Salvador', 'https://www.farejaviagens.com.br/wp-content/uploads/2024/10/Salvador-Submarino-Viagens.jpg',
'Passagem para Salvador, Pousada Pelourinho, Tour Histórico em Salvador', 1000.00),

('Pacote para Porto de Galinhas', 'https://ipojuca.pe.gov.br/wp-content/uploads/2025/03/porto-de-galinhas.jpg',
'Passagem para Porto de Galinhas, 
Hotel Resort Porto de Galinhas, 
Passeio de Mergulho em Porto de Galinhas', 1600.00),

('Pacote para Cataratas do Iguaçu', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/0e/3d/2e/cataratas-do-iguacu.jpg?w=900&h=500&s=1',
'Passagem para Cataratas do Iguaçu, 
Hotel Cataratas, 
Passeio às Cataratas do Iguaçu', 2050.00),

('Pacote para Florianópolis', 'https://blog.123milhas.com/wp-content/uploads/2023/03/aniversario-de-florianopolis-cinco-curiosidades-sobre-a-cidade-conexao123.jpg',
'Passagem para Florianópolis, 
Hotel Pousada Ilha da Magia, 
Passeio de Ilha em Florianópolis', 1200.00),

('Pacote para Chapada Diamantina', 'https://www.melhoresdestinos.com.br/wp-content/uploads/2019/10/chapada-diamantina.jpg',
'Passagem para Chapada Diamantina, 
Hotel Chapada Diamantina, 
Passeio de Trilha na Chapada Diamantina', 1070.00),

('Pacote para Bonito', 'https://roctrip.com.br/wp-content/uploads/2021/09/bonito-ms.jpg',
'Passagem para Bonito, 
Hotel Pousada Bonito, 
Passeio de Flutuação em Bonito', 1200.00);
