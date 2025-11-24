using Microsoft.AspNetCore.SignalR;

namespace SignalR.Hubs;

public class UserHub : Hub
{
  private static int TotalViews { get; set; } = 0;

  public async Task NewWindowLoaded()
  {
    TotalViews++;
    
    //send update to all clients that total views has been updated
    await Clients.All.SendAsync("UpdateTotalViews", TotalViews);
  }
}