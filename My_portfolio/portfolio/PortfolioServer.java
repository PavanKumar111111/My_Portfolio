import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.file.Files;

/**
 * A lightweight, zero-dependency Java static file server
 * to host and preview the developer portfolio website.
 */
public class PortfolioServer {

    public static void main(String[] args) {
        int port = 8080;
        try {
            HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
            server.createContext("/", new StaticFileHandler());
            server.setExecutor(null); // default executor
            
            System.out.println("=================================================");
            System.out.println("   PAVAN KUMAR GANDAVARAPU - PORTFOLIO SERVER   ");
            System.out.println("=================================================");
            System.out.println("Server successfully started!");
            System.out.println("Access your portfolio at: http://localhost:" + port + "/");
            System.out.println("Press Ctrl+C in terminal to stop the server.");
            System.out.println("=================================================");
            
            server.start();
        } catch (IOException e) {
            System.err.println("Failed to start server: " + e.getMessage());
            e.printStackTrace();
        }
    }

    static class StaticFileHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String path = exchange.getRequestURI().getPath();
            
            // Serve index.html as the root path
            if (path.equals("/")) {
                path = "/index.html";
            }

            // Prevent path traversal vulnerability
            path = path.replace("..", "");
            File file = new File("." + path);

            if (!file.exists() || file.isDirectory()) {
                String response = "404 Not Found";
                exchange.sendResponseHeaders(404, response.length());
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
                return;
            }

            // Set proper content-type
            String contentType = getContentType(file.getName());
            exchange.getResponseHeaders().set("Content-Type", contentType);

            // Read and send the file content
            byte[] fileBytes = Files.readAllBytes(file.toPath());
            exchange.sendResponseHeaders(200, fileBytes.length);
            OutputStream os = exchange.getResponseBody();
            os.write(fileBytes);
            os.close();
        }

        private String getContentType(String fileName) {
            if (fileName.endsWith(".html")) return "text/html; charset=UTF-8";
            if (fileName.endsWith(".css")) return "text/css; charset=UTF-8";
            if (fileName.endsWith(".js")) return "application/javascript; charset=UTF-8";
            if (fileName.endsWith(".png")) return "image/png";
            if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) return "image/jpeg";
            if (fileName.endsWith(".svg")) return "image/svg+xml";
            if (fileName.endsWith(".ico")) return "image/x-icon";
            return "text/plain; charset=UTF-8";
        }
    }
}
