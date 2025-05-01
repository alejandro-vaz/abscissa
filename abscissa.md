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

    classDef X fill:#000000

    classDef 0 fill:#770000

    classDef 1 fill:#772800

    classDef 2 fill:#774f00

    classDef 3 fill:#777700

    classDef 4 fill:#597700

    classDef 5 fill:#3c7700

    classDef 6 fill:#1e7700

    classDef 7 fill:#007700

    classDef 8 fill:#007728

    classDef 9 fill:#00774f

    classDef 10 fill:#007777

    classDef dept fill:#3332



    ABSCISSA((ABSCISSA<br>2.1))

    class ABSCISSA 4



    alejo1([77 Alejo])

    diego1([68 Diego])

    class alejo1 6

    class diego1 3



    BACKEND{{DEPT. BACKEND<br>Control}}

    FRONTEND{{DEPT. FRONTEND<br>Entry}}

    MARKETING{{DEPT. MARKETING<br>Need}}

    FINANZAS{{DEPT. FINANCES<br>Time}}

    RRHH{{DEPT. HR.<br>Scale}}

    class BACKEND 8

    class FRONTEND 5

    class MARKETING 0

    class FINANZAS 5

    class RRHH 0



    alejo2(77 Alejo)

    alejo3(77 Alejo)

    diego2(68 Diego)

    diego3(68 Diego)

    diego4(68 Diego)

    class alejo2 7

    class alejo3 5

    class diego2 3

    class diego3 6

    class diego4 5



    beltran>52 Beltrán]

    jorge>39 Jorge]

    class beltran 4

    class jorge 0



    sergio[[33 Sergio]]

    class sergio 2



    guzman[/25 Guzmán\]

    dela[/14 Dela\]

    class guzman 1

    class dela 0



    luis[/10 Luis/]

    class luis 5



    juan[\8 Juan\]

    marcos[\7 Marcos\]

    class juan 1

    class marcos 2





    ABSCISSA ==> alejo1

    alejo1 -.-> BACKEND

    alejo1 -.-> FRONTEND



    ABSCISSA ==> diego1

    diego1 -.-> MARKETING

    diego1 -.-> FINANZAS

    diego1 -.-> RRHH



    subgraph 1[" "]

        BACKEND ==> alejo2

        alejo2 --> beltran

        alejo2 --> jorge

        beltran --> sergio

    end



    subgraph 2[" "]

        FRONTEND ==> alejo3

        alejo3 --> guzman

        guzman --> juan

    end



    subgraph 3[" "]

        MARKETING ==> diego2

        diego2 --> dela

        dela --> luis

    end



    subgraph 4[" "]

        FINANZAS ==> diego3

    end



    subgraph 5[" "]

        RRHH ==> diego4

        diego4 --> marcos

    end



    class 1,2,3,4,5 dept

```