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

- [X] Paola

- [X] Sergio

### Jerarquía de trabajo

```mermaid
flowchart LR

    ABSCISSA((ABSCISSA)) 



    alejo1([Alejo])

    jorge1([Jorge])



    alejo2(Alejo)

    jorge2(Jorge)

    diego(Diego)

    paola(Paola)

    marcos(Marcos)



    beltrán>Beltrán]



    guzmán[[Guzmán]]

    juan[[Juan]]

    sergio[[Sergio]]

    luis[[Luis]]

    dela[[Dela]]



    BACKEND{{DPTO. BACKEND}}

    FRONTEND{{DPTO. FRONTEND}}

    FINANZAS{{DPTO. FINANZAS}}

    ESCALABILIDAD{{DPTO. ESCALABILIDAD}}

    MARKETING{{DPTO. MARKETING}}





    ABSCISSA <==> alejo1

    ABSCISSA <==> jorge1



    alejo1 -.-> FRONTEND

    alejo1 -.-> FINANZAS

    alejo1 -.-> MARKETING

    alejo1 -.-> BACKEND

    alejo1 -.-> ESCALABILIDAD

    jorge1 -.-> FRONTEND

    jorge1 -.-> FINANZAS

    jorge1 -.-> MARKETING

    jorge1 -.-> BACKEND

    jorge1 -.-> ESCALABILIDAD



    FRONTEND <==> alejo2

    alejo2 --> guzmán

    alejo2 --> juan



    BACKEND <==> jorge2

    jorge2 --> beltrán

    beltrán --> sergio



    FINANZAS <==> diego



    MARKETING <==> paola

    paola --> luis



    ESCALABILIDAD <==> marcos

    marcos --> dela

```