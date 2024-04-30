#include <Ethernet.h>

#include <SPI.h>

#define REQ_BUF_SZ 128
#define FIRST_PIN 2
#define LAST_PIN 13
#define FREE_SOCKETS 1

EthernetClient client;

#define MAX_BUFFER_SIZE 1024
uint16_t rsize;
uint8_t buff[MAX_BUFFER_SIZE];
char HTTP_req[REQ_BUF_SZ] = {0}; // buffered HTTP request stored as null terminated string
char req_index = 0;              // index into HTTP_req buffer

byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xEE};
IPAddress ip(192, 168, 0, 120);
EthernetServer server(80);

void setup()
{
  for (int i = FIRST_PIN; i <= LAST_PIN; i++)
  { // Установил все пины в input
    pinMode(i, INPUT);
  }
  Ethernet.begin(mac, ip);
  server.begin();
  digitalWrite(10, HIGH);

}
void loop()
{
  serverWorks();
}

void serverWorks2(EthernetClient sclient)
{

  if (sclient)
  {
    // если сервер поднят
    boolean currentLineIsBlank = true;
    while (sclient.connected())
    { // и мы подключились
      if (sclient.available())
      {
        char c = sclient.read(); // присваиваем реквесты переменной с
        if (req_index < (REQ_BUF_SZ - 1))
        {
          HTTP_req[req_index] = c; // читаем посимвольно запрос
          req_index++;
        }
        if (c == '\n' && currentLineIsBlank)
        { // если символы в запросе кончились то


        /////////////////////////////////////Вот тут начинается Ajax///////////////////////////////////////////////
          if (String(HTTP_req).indexOf("readPinInfo") >= 0) {
            String pinStates = "[";
            for (int i = FIRST_PIN; i <= LAST_PIN; i++) {
              bool pinState = digitalRead(i);
              pinStates += "{\"pin\":" + String(i) + ",\"state\":" + String(pinState ? "\"Авария\"" : "\"В работе\"") + "}";
              if (i < LAST_PIN) {
                pinStates += ", ";
              }
            }
            pinStates += "]";
            
            sclient.println("HTTP/1.1 200 OK");
            sclient.println("Content-Type: application/json");
            sclient.println("Connection: close");
            sclient.print("Content-Length: ");
            sclient.println(pinStates.length());
            sclient.println();
            sclient.print(pinStates);
          }

          /////////////////////////////////////Вот заканчивается Ajax///////////////////////////////////////////////
          req_index = 0;
          StrClear(HTTP_req, REQ_BUF_SZ);
          break;
        }
        if (c == '\n')
        {
          // you're starting a new line
          currentLineIsBlank = true;
        }
        else if (c != '\r')
        {
          // you've gotten a character on the current line
          currentLineIsBlank = false;
        }
      }
    }
    // give the web browser time to receive the data
    delay(1);
    // close the connection:
    sclient.stop();
  }
}

void StrClear(char *str, char length)
{
  for (int i = 0; i < length; i++)
  {
    str[i] = 0;
  }
}

char StrContains(char *str, char *sfind)
{
  char found = 0;
  char index = 0;
  char len;
  len = strlen(str);
  if (strlen(sfind) > len)
  {
    return 0;
  }
  while (index < len)
  {
    if (str[index] == sfind[found])
    {
      found++;
      if (strlen(sfind) == found)
      {
        return 1;
      }
    }
    else
    {
      found = 0;
    }
    index++;
  }
  return 0;
}
void serverWorks()
{
  for (int sock = 0; sock < MAX_SOCK_NUM - FREE_SOCKETS; sock++)
  {
    EthernetClient sclient = server.available_(sock);
    serverWorks2(sclient);
  }
  /*
  EthernetClient sclient = server.available();
  serverWorks2(sclient);
  */
}