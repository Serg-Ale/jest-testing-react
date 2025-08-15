import Logo from '@/assets/secondary.png';

const Footer = () => {
	return (
		<footer
			role='contentinfo'
			data-testid='footer'
			className='flex justify-center items-center p-4 w-full bg-white px-20 fixed bottom-0 left-0 right-0 z-50'
		>
			<div className='flex items-center gap-2 text-sm text-center'>
				<img src={Logo} alt='logo' className='w-30' />
				<span aria-label='copyright'>
					© {new Date().getFullYear()} Todos os direitos reservados | Projeto fictício desenvolvido para fins de estudo.
				</span>
			</div>
		</footer>
	);
};

export default Footer;
