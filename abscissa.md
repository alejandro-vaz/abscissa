## Miembros

### Resumen de miembros actuales

- [X] Alejo

- [X] Beltrán

- [X] Diego

- [X] Dela

- [X] Guzmán

- [X] Jorge

- [X] Juan

- [X] Luis

- [X] Marcos

- [X] Sergio

### Equipo

```mermaid
flowchart TD

    classDef 0 fill:#700

    classDef 1 fill:#770

    classDef 2 fill:#070

    classDef 3 fill:#077

    classDef dept fill:#3332



    ABSCISSA((ABSCISSA<br>2.0))

    class null 0

    class null 1

    class ABSCISSA 2

    class null 3



    alejo1([Alejo])

    diego1([Diego])

    class null 0

    class diego1 1

    class alejo1 2

    class null 3



    BACKEND{{DEPT. BACKEND<br>Control}}

    FRONTEND{{DEPT. FRONTEND<br>Entry}}

    MARKETING{{DEPT. MARKETING<br>Need}}

    FINANZAS{{DEPT. FINANZAS<br>Time}}

    RRHH{{DEPT. RR.HH.<br>Scale}}

    class MARKETING,RRHH 0

    class null 1

    class null 2

    class BACKEND,FRONTEND,FINANZAS 3



    jorge(Jorge)

    alejo2(Alejo)

    diego2(Diego)

    dela(Dela)

    marcos(Marcos)

    class dela,marcos 0

    class jorge 1

    class diego2 2

    class alejo2 3



    beltrán>Beltrán]

    class null 0

    class null 1

    class beltrán 2

    class null 3



    sergio[[Sergio]]

    guzmán[[Guzmán]]

    juan[[Juan]]

    luis[[Luis]]

    class sergio,luis 0

    class guzmán,juan 1

    class null 2

    class null 3





    ABSCISSA ==> alejo1

    alejo1 -.-> BACKEND

    alejo1 -.-> FRONTEND



    ABSCISSA ==> diego1

    diego1 -.-> MARKETING

    diego1 -.-> FINANZAS

    diego1 -.-> RRHH



    subgraph 1[" "]

        BACKEND ==>|-4/8| jorge

        jorge -->|0/4| beltrán

        beltrán -->|-4/2| sergio

    end



    subgraph 2[" "]

        FRONTEND ==>|X/8| alejo2

        alejo2 -->|-4/2| guzmán

        alejo2 -->|-4/2| juan

    end



    subgraph 3[" "]

        MARKETING ==>|-4/8| dela

        dela -->|-2/4| luis

    end



    subgraph 4[" "]

        FINANZAS ==>|X/8| diego2

    end



    subgraph 5[" "]

        RRHH ==>|-4/8| marcos

    end



    class 1,2,3,4,5 dept

```