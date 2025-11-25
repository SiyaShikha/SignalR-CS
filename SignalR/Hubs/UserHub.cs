using Microsoft.AspNetCore.SignalR;

namespace SignalR.Hubs;

public class UserHub : Hub
{
  private static int TotalViews { get; set; } = 0;
  
  private static int TotalUsers { get; set; } = 0;

  public override Task OnConnectedAsync()
  {
    TotalUsers++;
    Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
    return base.OnConnectedAsync();
  }

  public override Task OnDisconnectedAsync(Exception? exception)
  {
    TotalUsers--;
    Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
    return base.OnDisconnectedAsync(exception);
  }

  public async Task NewWindowLoaded()
  {
    TotalViews++;
    
    //send update to all clients that total views has been updated
    await Clients.All.SendAsync("UpdateTotalViews", TotalViews);
  }
}