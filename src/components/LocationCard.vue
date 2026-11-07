<template>
    <div
        class="reveal-highlight reveal-highlight-primary/80 card-bg flex h-full min-w-0 flex-col gap-3 rounded border p-4"
    >
        <div class="flex items-center gap-2 font-semibold">
            <i class="fa-solid fa-location-dot text-primary" />
            Localização atual
        </div>

        <a
            v-tooltip="address"
            :href="mapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="relative block min-h-28 flex-1 overflow-hidden rounded bg-muted hover:brightness-100!"
            :aria-label="`Abrir ${address} no mapa`"
        >
            <div
                class="absolute top-1/2 left-1/2 grid grid-cols-[repeat(3,16rem)]"
                :style="mapOffset"
            >
                <img
                    v-for="tile in tiles"
                    :key="tile"

                    class="h-64 w-64 max-w-none"
                    :src="tile"
                    alt=""
                    draggable="false"
                />
            </div>

            <span
                class="border-2-background absolute top-1/2 left-1/2 h-3 w-3 -translate-1/2 rounded-full bg-primary"
            />

            <span class="absolute right-1 bottom-0.5 text-[0.55rem] text-muted-foreground">
                © Esri © OpenStreetMap
            </span>
        </a>

        <div class="mt-auto flex items-center justify-between gap-2 text-sm">
            <span class="text-muted-foreground">{{ city }}</span>

            <span class="flex items-center gap-1.5 font-mono text-primary">
                <i
                    class="fa-solid text-xs"
                    :class="isDaytime ? 'fa-sun' : 'fa-moon'"
                />
                {{ time }}
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const ADDRESS = "R. Raphaela Júlia Viana 500, Camaquã, Rio Grande do Sul";

/** Point on the street; OpenStreetMap has no house number 500 there, so the pin is approximate */
const LATITUDE = -30.8502;
const LONGITUDE = -51.8036;
const ZOOM = 14;
const TILE_SIZE = 256;

/** Esri gray canvas basemaps; free with attribution and no API key */
const TILE_SERVER = "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas";

const timeFormat = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
});

/**
 * Converts the coordinates to fractional slippy map tile coordinates
 * @returns {{ x: number; y: number }} The tile coordinates at ZOOM
 */
function toTile(): { x: number; y: number } {
    const scale = 2 ** ZOOM;
    const latitude = (LATITUDE * Math.PI) / 180;

    return {
        x: ((LONGITUDE + 180) / 360) * scale,
        y: ((1 - Math.log(Math.tan(latitude) + 1 / Math.cos(latitude)) / Math.PI) / 2) * scale
    };
}

export default defineComponent({
    name: "LocationCard",

    data() {
        return {
            city: "Camaquã, RS",
            address: ADDRESS,
            mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`,
            now: new Date(),
            clock: null as number | null
        };
    },

    computed: {
        time(): string {
            return timeFormat.format(this.now);
        },

        isDaytime(): boolean {
            const hour = Number(this.time.slice(0, 2));

            return hour >= 6 && hour < 18;
        },

        tiles(): string[] {
            const style = this.$project.style.activeTheme === "light" ? "Light" : "Dark";
            const { x, y } = toTile();
            const urls: string[] = [];

            for (let row = -1; row <= 1; row++) {
                for (let column = -1; column <= 1; column++) {
                    urls.push(
                        `${TILE_SERVER}/World_${style}_Gray_Base/MapServer/tile/${ZOOM}/${Math.floor(y) + row}/${Math.floor(x) + column}`
                    );
                }
            }

            return urls;
        },

        /** Shifts the 3x3 tile grid so the city sits at the center of the map */
        mapOffset(): Record<string, string> {
            const { x, y } = toTile();
            const left = (x - Math.floor(x) + 1) * TILE_SIZE;
            const top = (y - Math.floor(y) + 1) * TILE_SIZE;

            return { transform: `translate(-${left}px, -${top}px)` };
        }
    },

    mounted() {
        this.clock = window.setInterval(() => {
            this.now = new Date();
        }, 1000);
    },

    beforeUnmount() {
        if (this.clock != null) {
            window.clearInterval(this.clock);
            this.clock = null;
        }
    }
});
</script>
