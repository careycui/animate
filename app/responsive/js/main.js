$(document).ready(function () {
	$('select').change(function () {
		$('select option').each(function(index, el) {
			$('body').removeClass($(el).attr('value'));
		});
		$('body').addClass($('select').val());
	});

	$('select option').each(function(index, el) {
		$('body').removeClass($(el).attr('value'));
	});
	$('body').addClass($('select').val());

	$('menu a, article a, aside a').click(function (e) {
		e.preventDefault();
	});

	$('a.mode').click(function (e) {
		var rel = $(this).attr('rel');
		$('select').val(rel);
		$('select option').each(function(index, el) {
			$('body').removeClass($(el).attr('value'));
		});
		$('body').addClass($('select').val());
	});
});