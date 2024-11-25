import asyncio
import websockets
import json
import time
import random

class ESP8266Simulator:
    def __init__(self):
        # Configuración del WebSocket
        self.uri = "ws://192.168.177.200:8080/app/n0yio342pjj34u5ua96t"
        self.channel = "tag-rfid-read"
        self.connected = False

    async def connect(self):
        """Establece la conexión WebSocket y maneja los mensajes"""
        try:
            async with websockets.connect(self.uri) as websocket:
                print(f"Conectado a {self.uri}")
                self.connected = True

                # Enviar mensaje de suscripción
                subscribe_message = {
                    "event": "pusher:subscribe",
                    "data": {
                        "channel": self.channel
                    }
                }
                await websocket.send(json.dumps(subscribe_message))
                print(f"Suscrito al canal: {self.channel}")

                # Iniciar las tareas de envío y recepción
                await asyncio.gather(
                    self.send_periodic_data(websocket),
                    self.receive_messages(websocket)
                )
        except Exception as e:
            print(f"Error de conexión: {e}")
            self.connected = False

    async def send_periodic_data(self, websocket):
        """Simula el envío periódico de datos como lo haría el ESP8266"""
        while True:
            try:
                mensaje = {
                    "event": "mensaje-esp8266",
                    "data": {
                        "valor": random.randint(0, 100)
                    }
                }
                await websocket.send(json.dumps(mensaje))
                print(f"Mensaje enviado: {mensaje}")
                await asyncio.sleep(5)  # Espera 5 segundos entre mensajes
            except Exception as e:
                print(f"Error enviando datos: {e}")
                break

    async def receive_messages(self, websocket):
        """Maneja los mensajes recibidos del servidor"""
        while True:
            try:
                message = await websocket.recv()
                print(f"Mensaje recibido: {message}")
                
                # Procesar el mensaje JSON recibido
                data = json.loads(message)
                if data.get("event") == "pusher:connection_established":
                    print("Conexión establecida con el servidor")
                elif data.get("event") == "pusher:subscription_succeeded":
                    print(f"Suscripción exitosa al canal {self.channel}")
            except Exception as e:
                print(f"Error recibiendo mensajes: {e}")
                break

async def main():
    # Crear y ejecutar el simulador
    simulator = ESP8266Simulator()
    
    try:
        print("Iniciando simulador ESP8266...")
        await simulator.connect()
    except KeyboardInterrupt:
        print("\nSimulador detenido por el usuario")
    except Exception as e:
        print(f"Error en el simulador: {e}")

if __name__ == "__main__":
    # Configurar logging para ver más detalles (opcional)
    import logging
    logging.basicConfig(level=logging.INFO)
    
    # Ejecutar el simulador
    asyncio.run(main())