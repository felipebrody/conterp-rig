CREATE DATABASE conterp;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE rigs (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR UNIQUE NOT NULL
);

CREATE TABLE users (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    access_level VARCHAR NOT NULL CHECK (access_level IN ('user', 'adm')), 
    rig_id UUID,
    FOREIGN KEY(rig_id) REFERENCES rigs(id)
);

CREATE TABLE oil_wells (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR
)


CREATE TABLE efficiencies (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    available_hours NUMERIC(10,2) NOT NULL,
    rig_id UUID,
    user_id UUID,
    oil_well_id UUID,
    FOREIGN KEY(rig_id) REFERENCES rigs(id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(oil_well_id) REFERENCES oil_well(id),
);

CREATE TABLE gloss_details (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    efficiency_id UUID,
    FOREIGN KEY(efficiency_id) REFERENCES efficiencies(id)
);

CREATE TABLE gloss_periods (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    start_hour TIME NOT NULL,
    end_hour TIME NOT NULL,
    classification VARCHAR,
    description TEXT,
    gloss_detail_id UUID,
    FOREIGN KEY(gloss_detail_id) REFERENCES gloss_details(id)

);

CREATE TABLE operating_periods_details (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    efficiency_id UUID,
    FOREIGN KEY(efficiency_id) REFERENCES efficiencies(id)
)

CREATE TABLE operating_periods (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    start_hour TIME NOT NULL,
    end_hour TIME NOT NULL,
    description TEXT,
    operating_periods_detail_id UUID,
    FOREIGN KEY(operating_periods_details) REFERENCES operating_periods_details(id)
)


CREATE TABLE repair_details (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    efficiency_id UUID,
    FOREIGN KEY(efficiency_id) REFERENCES efficiencies(id)
);

CREATE TABLE repair_periods (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    start_hour TIME NOT NULL,
    end_hour TIME NOT NULL,
    classification VARCHAR,
    description TEXT,
    repair_detail_id UUID,
    FOREIGN KEY(repair_detail_id) REFERENCES repair_details(id)
);

CREATE TABLE dtm_details (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    efficiency_id UUID,
    FOREIGN KEY(efficiency_id) REFERENCES efficiencies(id)
);

CREATE TABLE dtm_periods (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
   start_hour TIME NOT NULL,
    end_hour TIME NOT NULL,
    distance VARCHAR NOT NULL,
    dtm_detail_id UUID,
    description TEXT,
    FOREIGN KEY(dtm_detail_id) REFERENCES efficiencies(id)
);

CREATE TABLE fluid_ratio_details (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    efficiency_id UUID,
    FOREIGN KEY(efficiency_id) REFERENCES efficiencies(id)
)

CREATE TABLE fluid_ratio_periods (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    ratio VARCHAR,
    fluid_ratio_detail_id UUID,
    FOREIGN KEY(fluid_ratio_detail_id) REFERENCES fluid_ratio_details(id)
);

CREATE TABLE equipment_ratio_details (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    efficiency_id UUID,
    FOREIGN KEY(efficiency_id) REFERENCES efficiencies(id)
)

CREATE TABLE equipment_ratio_periods (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    ratio VARCHAR,
    equipment_ratio_detail_id UUID,
    FOREIGN KEY(equipment_ratio_detail_id) REFERENCES equipment_ratio_details(id)
);










