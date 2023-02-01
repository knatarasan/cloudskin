-- To start psql client in mac
-- kannappannatarasan ~ % psql postgres
CREATE DATABASE cs_db;
CREATE ROLE cs WITH LOGIN PASSWORD '<password>';
GRANT ALL PRIVILEGES ON DATABASE cs_db TO cs;

-- To check login: psql postgresql://cs:cs@127.0.0.1:5432/cs_db




-- To initialize install command options for Postgresql
-- Table Definition
CREATE TABLE "public"."aws_installableservice" (
    "id" int8 NOT NULL,
    "service_name" text,
    "service_version" text,
    "service_type" text,
    "service_os" text,
    "service_port" int4,
    "service_install_command" jsonb,
    "service_uninstall_command" jsonb,
    "date_created" timestamptz NOT NULL,
    "date_modified" timestamptz NOT NULL,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."aws_installableservice" ("id", "service_name", "service_version", "service_type", "service_os", "service_port", "service_install_command", "service_uninstall_command", "date_created", "date_modified") VALUES
(1, 'postgresql', '15', 'db', 'centos', 5432, '["#sudo yum update", "sudo yum install -y postgresql-server", "sudo /usr/bin/postgresql-setup initdb", "sudo systemctl start postgresql", "sudo systemctl enable postgresql"]', '["sudo systemctl stop postgresql", "sudo yum remove postgresql postgresql-server", "#sudo rm -rf /var/lib/pgsql/data", "sudo yum list installed | grep postgresql"]', '2023-02-01 13:09:43.011363-08', '2023-02-01 13:09:43.011386-08');
