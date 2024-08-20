                                using AutoMapper.Internal;
using BHYT.API.Models.DTOs;

namespace BHYT.API.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(EmailDTO mailrequest);
    }
}
