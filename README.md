# Plan de entrenamiento 12 semanas — app de registro (PWA)

Aplicación web de un solo propósito: llevar el plan de 12 semanas desde el móvil mientras
entrenas, sin cuenta, sin nube y sin conexión a internet.

    ~/plan-entrenamiento/

## Qué hay aquí

| Fichero | Para qué sirve |
|---|---|
| `index.html` | La app (estructura y estilos). |
| `app.js` | Toda la lógica: plan, ejercicios, peldaños, progresión, cronómetro, exportación. |
| `sw.js` | Service worker: guarda la app en caché para uso sin conexión (solo funciona por https). |
| `manifest.webmanifest` | Metadatos de instalación (nombre, iconos, colores). |
| `icons/` | Iconos 192 y 512 px (+ versión maskable). |
| `hacer_iconos.py` | Regenera los iconos con PIL. |
| `servir.sh` | Levanta un servidor local en el puerto 8080 para abrirla desde el móvil. |
| `plan12w.service` | Unidad systemd de usuario para tener el servidor siempre arriba. |
| `plan12w-tunnel.service` | Túnel https temporal (cloudflared) para instalarla en el móvil. |
| `publicar_en_pages.sh` | Publica la app en GitHub Pages (URL https estable y reinstalable). |
| `.nojekyll` | Evita que GitHub Pages procese los ficheros con Jekyll. |
| `tests.js` | Pruebas de la lógica (progresión, fases, cardio, formatos). |
| `_preview.html` | Solo desarrollo: siembra datos falsos y ejecuta un autotest en el navegador. |

## Uso diario en el móvil

1. En el PC: `systemctl --user start plan12w` (o `./servir.sh`).
2. En el móvil, misma wifi: `http://<IP-del-equipo>:8080` (el script te dice la IP al arrancar)
3. Chrome → menú ⋮ → *Añadir a pantalla de inicio*. Queda un icono propio, a pantalla completa.

En la pestaña **Hoy** está el botón para empezar la sesión. Los valores de cada serie vienen
precargados de la última vez que hiciste ese ejercicio: si repites lo mismo, solo hay que
tocar el ✓ de cada serie. Al marcarla arranca solo el cronómetro de descanso.

La pestaña **Historial** guarda cada sesión y dibuja la progresión por ejercicio.
La pestaña **Tarjeta** es la versión de una página para imprimir.

## Reglas que aplica la app

- Objetivos por rango: por ejemplo remo invertido 3 × 6-12 repeticiones.
- Solo propone subir si las **dos últimas sesiones** cumplen: todas las series al tope del
  rango, con 2-3 repeticiones en reserva (RIR ≥ 2) y todas las series marcadas.
- Cuando toca, propone **una sola** cosa: subir un peldaño de dificultad o sumar una
  repetición por serie (5 s en ejercicios de tiempo). Nunca las dos.
- El tirón vertical cambia de objetivo por fase: semanas 1-4 colgado pasivo, 5-8 negativas
  de 5 s, 9-12 negativas de 8 s o intento de dominada.
- El cardio de la semana se muestra según el tramo de 12 semanas que toque.

## Peldaños: qué son y cómo se eligen

Un peldaño es una versión más fácil o más difícil del mismo movimiento (flexiones con las
manos en la barra → en el suelo → con los pies elevados). Sin pesas, subir de peldaño es la
forma de seguir progresando cuando las repeticiones se quedan cortas.

Dos reglas que conviene tener claras:

1. **Cada peldaño tiene su propio rango** (el campo `min`/`max` de cada escalón en `EX`). Al
   subir de peldaño el ejercicio se vuelve más duro y el rango baja.
2. **El nivel de partida lo elige el usuario**, no el plan. Se hace en *Ajustes → Mi nivel*
   (o con los botones ± peldaño dentro de la sesión). Criterio: el peldaño donde ahora mismo
   puedas hacer el rango que se indica dejando 2-3 repeticiones en reserva. Ni el más fácil
   que te salga, ni uno en el que no llegues al mínimo.

La rampa por semanas (colgado en 1-4, negativas de 5 s en 5-8, negativas de 8 s en 9-12) es
**solo el valor por defecto del tirón vertical**, pensada para quien empieza sin ninguna
dominada. En cuanto el usuario elige su peldaño a mano, esa rampa se ignora por completo: por
ejemplo, con 3 dominadas limpias se elige «Dominadas · 3×3-8 reps» y la app pide repeticiones
desde la primera sesión, no segundos de colgado.

Lo que sigue siendo automático es **cuándo** se sube: cuando en las dos últimas sesiones se
cumple la regla (tope del rango en todas las series, RIR ≥ 2, técnica intacta), la app avisa
y ofrece subir una sola cosa, el peldaño o el incremento.

## Pantallas

La app tiene cuatro pestañas (y una quinta vista oculta para imprimir):

| Pestaña | Qué hay |
|---|---|
| **Hoy** | Empezar o continuar la sesión, actividad del día (pasos y calorías), la semana con los días y sus pasos, y el peso de la semana. |
| **Progreso** | Resumen de la semana natural (pasos, km, calorías), peso corporal con tendencia, progresión por ejercicio y las últimas sesiones. |
| **Plan** | Qué es cada ejercicio en llano y con vídeo, el selector de nivel (peldaños), las reglas y el acceso a la tarjeta imprimible (`#tarjeta`). |
| **Ajustes** | Altura y peso, fecha de inicio, registros de peso, modo sin conexión, exportar/importar y el detalle de las fórmulas. |
| **Sesión** (`#sesion`) | Se abre al empezar o continuar: los seis bloques con sus series, el cronómetro de descanso y el cierre de sesión. |

## Pasos y calorías

Los pasos se anotan a mano al final del día, y solo en los días marcados con el ✓ de
«he andado». Los totales sí cuentan cualquier día con pasos anotados, esté marcado o no.

    zancada (m)      = altura (cm) × 0,415 / 100
    distancia (km)   = pasos × zancada / 1000
    kcal caminar     = km × peso (kg) × 0,72          ≈ ritmo de 4,8 km/h, gasto bruto
    kcal fuerza      = MET × 3,5 × peso / 200 × minutos
    MET              = 4,0 (+0,5 si 18 series o más; +0,5 más si el RIR medio fue ≤ 1,5)

La duración de la fuerza sale del tiempo real de la sesión, acotado entre 8 y 75 minutos
(si no hay duración, se estima 1,5 min por serie completada). El peso usado para un día es el
último registrado hasta esa fecha, así que basta con anotar el peso una vez por semana.

Es una **estimación con ±20 % de error**: sirve para comparar semanas entre sí y ver si el
volumen de actividad sube o baja, no para contar calorías al gramo ni para ajustar la comida.

## Datos y copias

Todo se guarda en el `localStorage` del navegador del móvil. Nada sale del dispositivo.
Ajustes → *Exportar JSON* descarga una copia completa; *Exportar CSV* saca una tabla por
serie para abrir en LibreOffice. *Importar JSON* restaura una copia en otro dispositivo.

Aviso: los datos del navegador se borran si limpias los datos de Chrome. Exporta de vez en
cuando (o después de cada mesociclo).

## Dejarla en el móvil (offline, sin depender del PC)

El navegador solo guarda la app para uso sin conexión en contextos seguros: **https** o
`localhost`. Servida por http desde la red local no la cachea, así que haría falta el PC
encendido. Por eso hay dos caminos:

### A) Instalación rápida por túnel (sin cuentas)

    systemctl --user start plan12w-tunnel      # levanta un https temporal
    journalctl --user -u plan12w-tunnel --no-pager | grep -oE 'https://[a-z0-9-]+\.trycloudflare\.com' | tail -1

Con esa dirección en el móvil: menú ⋮ → *Instalar aplicación*. En cuanto Chrome termina de
guardarla, la app funciona **sola**: puedes apagar el servidor y el túnel.

    systemctl --user stop plan12w-tunnel plan12w

Verificado: con el túnel cerrado y el servidor apagado (el origen devolvía 530) la app se
recarga completa desde la caché del service worker. Para comprobarlo en el móvil:
Ajustes → *Modo sin conexión* debe decir "Guardada para uso sin conexión".

Aviso: el subdominio es aleatorio y cambia en cada arranque, así que **la instalación hay
que hacerla mientras el túnel está arriba**. Si algún día borras los datos de Chrome,
necesitarás reinstalarla desde una URL estable: camino B.

### B) URL estable en GitHub Pages (una sola vez)

    gh auth login
    ./publicar_en_pages.sh

Queda en `https://<usuario>.github.io/plan-entrenamiento/`, permanente, y se puede reinstalar
desde cualquier sitio o usar en otro móvil. Es otro origen, así que los datos no se copian
solos: **Ajustes → Exportar JSON** en el viejo e **Importar JSON** en el nuevo.

En los dos casos los datos viven en el almacenamiento del navegador del móvil y no viajan a
ningún servidor. Publicar la app no publica tus sesiones: los ficheros subidos son solo
código.

## Servidor en la red local

El puerto 8080 ya está permitido en la zona `FedoraWorkstation` (1025-65535/tcp), así que no
hace falta tocar el firewall. El servicio es de usuario:

    systemctl --user enable --now plan12w     # arrancar ahora y en cada sesión (ya está hecho)
    systemctl --user status plan12w
    systemctl --user disable --now plan12w    # parar y quitar del arranque
    journalctl --user -u plan12w -f           # ver el registro

Si quieres que siga vivo sin tener la sesión abierta: `loginctl enable-linger $USER`.

## Cambiar el plan

Los ejercicios están en la constante `EX` de `app.js` (arriba del todo). Cada uno lleva:

| Campo | Qué es |
|---|---|
| `name` / `en` | Nombre en español y nombre común en inglés (`inverted row`, `glute bridge`...). |
| `que` | Qué es el ejercicio, en llano, sin tecnicismos. |
| `como` | Cómo se hace con el material de casa, paso a paso. |
| `errores` | Los fallos típicos que hay que evitar. |
| `videos` | Lista de `{id, t, ch}`: id de YouTube (11 caracteres), título y canal. |
| `tip`, `ladder`, `sets`, `min`, `max`, `rest`, `step` | Objetivo, escalera de peldaños y descanso. |

Las explicaciones de los bloques (`Tirón horizontal`, `Empuje`...) están en `BLOCK_INFO`, el
vídeo del gato-camello en `WARMUP_VIDEO`, el cardio semanal en `CARDIO` y los textos de la
tarjeta en `WARMUP`, `RULES` y `PROG_RULE`.

Para añadir un vídeo: busca el id en la dirección de YouTube (`watch?v=XXXXXXXXXXX`) y
comprueba que responde antes de meterlo:

    curl -s -o /dev/null -w '%{http_code}\n' "https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=XXXXXXXXXXX"

`node tests.js` falla si algún ejercicio se queda sin explicación, sin vídeo o con un id que
no tiene 11 caracteres.

## Actualizar la app ya instalada en el móvil

1. Edita `app.js` o `index.html`.
2. Sube la versión en los dos sitios: `BUILD` en `app.js` y `CACHE` en `sw.js`. Si no subes
   `CACHE`, el service worker sigue sirviendo la copia vieja y parece que no cambia nada.
3. Republica en el **mismo origen** (`./publicar_en_pages.sh`).
4. En el móvil: abre la app con internet. El service worker se actualiza solo; si quieres
   forzarlo, Ajustes → *Buscar actualización*, que comprueba y recarga.

Condición que no se puede saltar: para recibir una actualización el origen tiene que seguir
existiendo y ser el mismo. Una app instalada desde un túnel temporal (dirección aleatoria,
ya apagada) seguirá funcionando para siempre, pero **no puede actualizarse nunca**: no hay
dirección a la que pedirle los ficheros nuevos. Por eso la instalación buena es la de una
URL estable (GitHub Pages).

## Pruebas

    node tests.js                 # 14 pruebas de lógica
    ./servir.sh                   # y abrir _preview.html#viva en el navegador
                                  # (autotest de extremo a extremo, informa por el log)
