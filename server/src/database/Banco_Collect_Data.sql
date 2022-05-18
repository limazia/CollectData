create database Collect_data
use  Collect_data

drop table Cliente
drop table Agendamento

create table Cliente
(
  id_cliente smallint identity primary key not null,
 nome varchar(50) not null,
 sobrenome varchar(50) not null,
 data_nascimento date not null,
 RG char(10) unique not null,
 email varchar(100),
 cep char(9) not null,
 estado varchar(50) not null,
 cidade varchar(50) not null,
 bairro varchar(50) not null,
 rua_avenida varchar(50) not null,
 numero varchar(6) not null,
 complemento varchar(50),
 telefone char(11),
 pressao char(1) check(pressao='A' or pressao='B') not null,
 diabetico char(1) check(diabetico='S' or diabetico='N') not null,
 hemofilico char(1) check( hemofilico='S' or  hemofilico='N') not null,
 cicatrizacao char(1) check(cicatrizacao='B' or cicatrizacao='R') not null,
 eplsepsia char(1) check(eplsepsia='S' or eplsepsia='N') not null,
 desmaio char(1) check(desmaio='S' or desmaio='N') not null,
 alergia_medicamento char(1) check( alergia_medicamento='S' or  alergia_medicamento='N') not null,
 medicamento varchar(150),
 hepatite char(1) check(hepatite='S' or hepatite='N') not null,
 tipo_hepatite char(1),
)

create table Profissional
(
id_profissional smallint identity primary key not null,
username varchar(20) not null,
senha varchar(50) not null,
nome varchar(50) not null,
sobrenome varchar(50) not null,
email varchar(100),
telefone char(11),
CNPJ char(14) unique not null,
nome_fantasia varchar(30) not null,
area_atuacao varchar(50) default('tatuagem'),
complemento varchar(50),
id_agendamento smallint references Agendamento(id_agendamento),
id_formulario smallint references Formulario(id_formulario),
)

create table Formulario
(
id_formulario smallint identity primary key not null,
texto_contrato text not null,
local_aplicacao varchar(100) not null,
dimensao_imagem varchar(50)not null,
valor_total money not null,
id_cliente smallint references Cliente(id_cliente)
)

create table Agendamento
(
id_agendamento smallint identity primary key not null,
data_agend date not null,
hora_agend date not null,
id_cliente smallint references Cliente(id_cliente)
)

select * from sys.tables
select * from Cliente
select * from Agendamento
select * from Formulario
select * from Profissional